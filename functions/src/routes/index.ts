import * as express from 'express'

const router = express.Router()

router.get('/info', (_, res) => {
  return res.send('Hello world')
})

export default router
