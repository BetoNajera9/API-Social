import env from 'dotenv'

env.config()

export default {
	remoteDB: process.env.REMOTE_DB ?? false,
	api: {
		port: process.env.PORT ?? 3000,
	},
	jwt: {
		secret: process.env.SECRET ?? 'secret',
	},
	mysql: {
		host: process.env.MYSQL_HOST ?? '',
		user: process.env.MYSQL_USER ?? '',
		password: process.env.MYSQL_PASSWORD ?? '',
		database: process.env.MYSQL_DATABASE ?? '',
	},
	redis: {
		host: process.env.CACHE_HOST ?? '',
		password: process.env.CACHE_PASSWORD ?? '',
		port: process.env.CACHE_PORT ?? '',
	},
	mysqlService: {
		host: process.env.MYSQL_SRV_HOST ?? 'localhost',
		port: process.env.MYSQL_SRV_PORT ?? 3001,
	},
	postService: {
		port: process.env.POST_SRV_PORT ?? 3002,
	},
	cacheService: {
		port: process.env.CACHE_SRV_PORT ?? 3003,
	},
}
