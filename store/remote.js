import axios from 'axios'

const createRoemoteDB = (host, port) => {
	const URL = `http://${host}:${port}`

	const list = async (table) => {
		const url = `${URL}/${table}`
		return await req('GET', url)
	}

	const get = async (table, id) => {
		const url = `${URL}/${table}/${id}`
		return await req('GET', url)
	}

	const upsert = async (table, data, exist) => {
		const url = `${URL}/${table}`
		if (exist === true) {
			return await req('PUT', url, data)
		} else if (exist === false) {
			return await req('POST', url, data)
		}
	}

	const query = async (table, query, join) => {
		const url = `${URL}/query/${table}`
		const data = {
			query,
			join,
		}
		return await req('POST', url, data)
	}

	const req = async (method, url, data) => {
		try {
			const res = await axios({
				method,
				url,
				headers: {
					'content-type': 'application/json',
				},
				data,
			})
			return res.data
		} catch (err) {
			console.error(err)
		}
	}

	return {
		list,
		get,
		upsert,
		query,
	}
}

export default createRoemoteDB
