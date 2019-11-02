import * as express from 'express'
import verify from '../auth/verify'
import balance from './balance'
import createAccount from './createAccount'
import deleteAccount from './deleteAccount'
import deposit from './deposit'
import withdrawal from './withdrawal'

const router = express.Router()

/**
 * Create a new account.
 */
router.route('/create').post(createAccount)

/**
 * Delete an existing account.
 */
router.route('/delete').post(verify, deleteAccount)

/**
 * Get account balance.
 * Use of POST request to allow account credentials be past
 * as request body.
 */
router.route('/balance').post(verify, balance)

/**
 * Deposit to account.
 */
router.route('/deposit').patch(verify, deposit)

/**
 * Withdrawal from account.
 */
router.route('/withdrawal').patch(verify, withdrawal)

export default router
