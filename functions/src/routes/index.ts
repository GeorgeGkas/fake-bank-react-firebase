import * as express from 'express'
import accounts from './accounts'

const router = express.Router()

/**
 * API endpoints used for accounts logic.
 */
router.use('/accounts', accounts)

export default router
