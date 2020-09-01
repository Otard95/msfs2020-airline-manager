import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
// import cors from 'cors'

import middleware from './midlewares'
import api from './api'

const app = express()

app.use(morgan(
  process.env.NODE_ENV === 'production'
    ? 'combined'
    : 'dev'
))
app.use(helmet())
// app.use(cors())
app.use(express.json())
// Serve static files and react app at any other url
app.use('/', express.static('public'))
app.get(/^\/[^(api)]{1}/, (_req, res) => {
  res.sendFile(path.resolve('./public/index.html'))
})

// Attach the api routes
app.use('/api', api)

// Use middleware
app.use(middleware.notFound)
app.use(middleware.errorHandler)

export default app
