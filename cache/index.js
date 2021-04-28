import express from 'express'
import morgan from 'morgan'

import config from '../config/envServer'
import errors from '../network/errors'
import cache from './network'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/', cache)

app.use(errors)

app.listen(config.cacheService.port, () => {
	console.log(`The server is running on port ${config.cacheService.port}`)
})
