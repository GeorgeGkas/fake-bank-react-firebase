import * as express from 'express'
import * as moment from 'moment'
import logger from '../../utils/logger'

export default async function create(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const data = req.body

  try {
    /**
     * Construct account object.
     */
    const account = {
      balance: 0,
      currentWithdrawalBalance: 0,
      lastWithdrawalDate: moment().format(),
      ...data,
    }

    /**
     * Add new account to database.
     */
    const docRef = await req.app
      .get('db')
      .collection('accounts')
      .add(account)

    /**
     * Update the document with the ID of the newly created account.
     */
    account.id = docRef.id
    await docRef.update(account)

    /**
     * Return the account ID.
     */
    return res.status(201).json({ data: docRef.id })
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ message: `Could not create new account.` })
  }
}
