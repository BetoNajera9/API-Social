import express from 'express'
import morgan from 'morgan'

import config from '../config/envServer'
import router from './network'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/', router)

app.listen(config.mysqlService.port, () => {
	console.log(`MySQL service is on port ${config.mysqlService.port}`)
})
