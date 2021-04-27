import env from 'dotenv'

env.config()

export default {
	port: process.env.PORT ?? 3000,
	secret: process.env.SECRET,
}
