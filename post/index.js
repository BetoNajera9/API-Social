import express from 'express'
import morgan from 'morgan'

import config from '../config/envServer'
import post from './components/post/network'
import errors from '../network/errors'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/post', post)

app.use(errors)

app.listen(config.postService.port, () => {
	console.log(`The server is running on port ${config.postService.port}`)
})
