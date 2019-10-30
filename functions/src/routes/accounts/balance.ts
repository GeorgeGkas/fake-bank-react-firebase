import * as express from 'express'
import * as firebase from 'firebase-admin'
import logger from '../../utils/logger'

export default async function balance(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const account = req.account!

  try {
    /**
     * Retrieve account document by ID.
     */
    const { docs } = await req.app
      .get('db')
      .collection('accounts')
      .where(firebase.firestore.FieldPath.documentId(), '==', account.id)
      .limit(1)
      .get()
    const doc = docs.pop()

    /**
     * Get the balance field of the document and return it.
     */
    const { balance: amount } = doc!.data()
    return res.status(200).json({ data: amount })
  } catch (e) {
    logger.error(e)
    return res
      .status(500)
      .send({
        message: `Could not get balance for account with id "${account.id}".`,
      })
  }
}
