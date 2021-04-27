import express from 'express'
import morgan from 'morgan'

import config from '../config/envServer'
import user from './components/user/netwok'
import auth from './components/auth/network'
import errors from '../network/errors'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/user', user)
app.use('/api/auth', auth)

app.use(errors)

app.listen(config.api.port, () => {
	console.log(`The server is running on port ${config.api.port}`)
})
