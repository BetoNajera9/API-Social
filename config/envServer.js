import env from 'dotenv'

env.config()

export default {
	api: {
		port: process.env.PORT ?? 3000,
	},
	jwt: {
		secret: process.env.SECRET,
	},
	mysql: {
		host: process.env.HOST ?? '',
		user: process.env.USER ?? '',
		password: process.env.PASSWORD ?? '',
		database: process.env.DATABASE ?? '',
	},
}
