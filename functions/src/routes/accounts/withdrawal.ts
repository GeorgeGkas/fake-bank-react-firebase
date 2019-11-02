import * as express from 'express'
import * as moment from 'moment'
import logger from '../../utils/logger'

/**
 * Maximum withdrawal per day.
 */
const ALLOWED_WITHDRAWAL_PER_DAY = 100

/**
 * Check if a number is multiple of 50 or 20.
 */
function multipleOf50or20(num: number): boolean {
  return (num % 50) % 20 === 0
}

/**
 * Check if we have not exceeded the allowed withdrawal amount this day.
 */
function canWithdrawal(
  account: {
    id: string
    holder: string
    balance: number
    lastWithdrawalDate: string
    currentWithdrawalBalance: number
  },
  withdrawalAmount: number,
): boolean {
  return (
    account.currentWithdrawalBalance + withdrawalAmount <=
      ALLOWED_WITHDRAWAL_PER_DAY ||
    (dayHasChangedFrom(account.lastWithdrawalDate) &&
      withdrawalAmount <= ALLOWED_WITHDRAWAL_PER_DAY)
  )
}

/**
 * Check if day has changed since lastDate.
 */
function dayHasChangedFrom(lastDate: string): boolean {
  return !moment(moment().format()).isSame(lastDate, 'day')
}

export default async function withdrawal(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const account = req.account!
  const withdrawalAmount = req.body.amount

  try {
    /**
     * Withdrawal amount must be non negative,
     * be less or equal of the current balance,
     * be multiple of 50 or 20,
     * and should not be more that the allowed withdrawal amount per day.
     */
    if (
      withdrawalAmount < 0 ||
      account.balance < withdrawalAmount ||
      !multipleOf50or20(withdrawalAmount) ||
      !canWithdrawal(account, withdrawalAmount)
    ) {
      return res.status(403).send({
        message: `Could not withdrawal "${withdrawalAmount}" from account with id "${account.id}".`,
      })
    }

    const docRef = req.app
      .get('db')
      .collection('accounts')
      .doc(account.id)

    /**
     * Make the deposit.
     */
    await docRef.update({
      /**
       * Decrease the balance.
       */
      balance: account.balance - withdrawalAmount,

      /**
       * Increase the current withdrawal balance if the day
       * has not changed, else zero it.
       */
      currentWithdrawalBalance: dayHasChangedFrom(account.lastWithdrawalDate)
        ? withdrawalAmount
        : account.currentWithdrawalBalance + withdrawalAmount,

      /**
       * Change the date of the last withdrawal action if the day has changed.
       * Allow us to track the current withdrawal balance per day.
       */
      lastWithdrawalDate: dayHasChangedFrom(account.lastWithdrawalDate)
        ? moment().format()
        : account.lastWithdrawalDate,
    })

    /**
     * OK!
     */
    return res.sendStatus(204)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({
      message: `Could not withdrawal "${withdrawalAmount}" from account with id "${account.id}".`,
    })
  }
}
