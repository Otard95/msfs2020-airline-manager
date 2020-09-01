import { Router } from 'express'

const router = Router({ strict: true })

router.get('/', (req, res) => {
  if (req.param('name')) return res.json({
    message: `Hi, ${req.param('name')}!`
  })

  return res.json({
    message: `Hi, there!`
  })
})

export default router
