import * as express from 'express'
import logger from '../../utils/logger'

export default async function deposit(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const account = req.account!
  const depositAmount = req.body.amount

  try {
    /**
     * Deposit amount must be non negative and be multiple of 5.
     */
    if (depositAmount < 0 || depositAmount % 5 !== 0) {
      return res
        .status(403)
        .send({
          message: `Could not deposit "${depositAmount}" to account with id "${account.id}".`,
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
      balance:
        Number((await docRef.get()).data()!.balance) + Number(depositAmount),
    })

    /**
     * OK!
     */
    return res.sendStatus(204)
  } catch (e) {
    logger.error(e)
    return res
      .status(500)
      .send({
        message: `Could not deposit "${depositAmount}" to account with id "${account.id}".`,
      })
  }
}
