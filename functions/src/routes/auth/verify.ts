import * as express from 'express'
import logger from '../../utils/logger'

/**
 * Auth middleware.
 */
export default async function verify(
  req: express.AugmentedRequest,
  res: express.Response,
  next: express.NextFunction,
) {
  const accountId = req.body.id
  const accountHolder = req.body.holder

  try {
    /**
     * Retrieve the account document by ID.
     */
    const docRef = req.app
      .get('db')
      .collection('accounts')
      .doc(accountId)

    /**
     * Check if account with specified ID exists.
     */
    const account = await docRef.get()
    if (!account.exists) {
      return res
        .status(404)
        .send({ message: `Could not find account with id "${accountId}".` })
    }

    /**
     * Check that the account belongs to `accountHolder`
     */
    const accountData = account.data()!
    if (accountData.holder !== accountHolder) {
      return res
        .status(403)
        .send({ message: `Could not relate account id with its holder.` })
    }

    /**
     * Proceed to requested endpoint.
     */
    req.account = {
      balance: accountData.balance,
      currentWithdrawalBalance: accountData.currentWithdrawalBalance,
      holder: accountData.holder,
      id: accountData.id,
      lastWithdrawalDate: accountData.lastWithdrawalDate,
    }
    return next()
  } catch (e) {
    logger.error(e)
    return res.sendStatus(500)
  }
}
