import mysql from 'mysql'

import config from '../config/envServer'

const dbConf = {
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
}

let connection

const handleConnection = () => {
	connection = mysql.createConnection(dbConf)

	connection.connect((err) => {
		if (err) {
			console.error(err)
			setTimeout(handleConnection, 2000)
		} else {
			console.log('DB connected!')
		}
	})

	connection.on('error', (err) => {
		console.error(`[db error]: ${err}`)
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleConnection()
		} else {
			throw err
		}
	})
}

const list = async (table) => {
	return new Promise((res, rej) => {
		connection.query(`SELECT * FROM ${table}`, (err, data) => {
			if (err) return rej(err)
			res(data)
		})
	})
}

const get = async (table, id) => {
	return new Promise((res, rej) => {
		connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
			console.error(err)
			if (err) return rej(err)
			res(data)
		})
	})
}

const upsert = (table, data, exist) => {
	if (exist === true) {
		return update(table, data)
	} else if (exist === false) {
		return insert(table, data)
	}
}

const insert = (table, data) => {
	return new Promise((res, rej) => {
		connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
			if (err) return rej(err)
			res(result)
		})
	})
}

const update = (table, data) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`UPDATE ${table} SET ? WHERE id=?`,
			[data, data.id],
			(err, result) => {
				if (err) return reject(err)
				resolve(result)
			}
		)
	})
}

const query = (table, query, join) => {
	let joinQuery = ''
	if (join) {
		const key = Object.keys(join)[0]
		const val = join[key]
		joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
	}

	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
			query,
			(err, res) => {
				if (err) return reject(err)
				resolve(res[0] || null)
			}
		)
	})
}

export default {
	list,
	get,
	upsert,
	query,
	insert,
	update,
}

handleConnection()
