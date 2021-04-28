import redis from 'redis'

import config from '../config/envServer'

const client = redis.createClient({
	host: config.redis.host,
	port: config.redis.port,
	password: config.redis.password,
})

const list = async (table) => {
	return new Promise((resolve, reject) => {
		client.get(table, (err, data) => {
			if (err) return reject(err)

			let res = data || null
			if (data) {
				res = JSON.stringify(data)
			}
			resolve(res)
		})
	})
}
const get = (table, id) => {
	const key = `${table}_${id}`
	return list(key)
}

const upsert = (table, data) => {
	let key = table
	if (data && data.id) {
		key = `${key}_${data.id}`
	}
	client.setex(key, 100, JSON.stringify(data))
	return true
}

export { list, get, upsert }
