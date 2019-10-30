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
router.route('/').post(createAccount)

/**
 * Delete an existing account.
 */
router.route('/').delete(verify, deleteAccount)

/**
 * Get account balance.
 */
router.route('/').get(verify, balance)

/**
 * Deposit to account.
 */
router.route('/deposit').patch(verify, deposit)

/**
 * Withdrawal from account.
 */
router.route('/withdrawal').patch(verify, withdrawal)

export default router
