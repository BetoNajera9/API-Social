import env from 'dotenv'

env.config()

export default {
	api: {
		port: process.env.PORT ?? 3000,
	},
	jwt: {
		secret: process.env.SECRET ?? 'secret',
	},
	mysql: {
		host: process.env.HOST ?? '',
		user: process.env.USER ?? '',
		password: process.env.PASSWORD ?? '',
		database: process.env.DATABASE ?? '',
	},
	mysqlService: {
		host: process.env.MYSQL_SRV_HOST ?? 'localhost',
		port: process.env.MYSQL_SRV_PORT ?? 3001,
	},
	postService: {
		port: process.env.POST_SRV_PORT ?? 3002,
	},
}
