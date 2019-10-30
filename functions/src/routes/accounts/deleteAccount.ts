import * as express from 'express'
import logger from '../../utils/logger'

export default async function deleteAccount(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const account = req.account!

  try {
    /**
     * Retrieve the account document by ID.
     */
    const docRef = req.app
      .get('db')
      .collection('accounts')
      .doc(account.id)

    /**
     * Delete account.
     */
    await docRef.delete()
    return res.sendStatus(204)
  } catch (e) {
    logger.error(e)
    return res
      .status(500)
      .send({ message: `Could not delete account with id "${account.id}".` })
  }
}
