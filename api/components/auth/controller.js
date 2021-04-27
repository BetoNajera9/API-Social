import bcrypt from 'bcrypt'

import auth from '../../../auth'
import error from '../../../utils/error'

const TABLA = 'auth'

export default (injectedStore) => {
	let store = injectedStore
	if (!store) {
		store = require('../../../store/dummy')
	}

	const upsert = async (data) => {
		const authData = {
			id: data.id,
		}

		if (data.username) {
			authData.username = data.username
		}

		if (data.password) {
			authData.password = await bcrypt.hash(data.password, 5)
		}

		return store.upsert(TABLA, authData, false)
	}

	const login = async (username, password) => {
		const data = await store.query(TABLA, { username })
		if (!data.password || !data.username) {
			data.password = data.body.password
			data.username = data.body.username
		}
		const equals = await bcrypt.compare(password, data.password)

		if (equals === true) {
			return auth.sign({ ...data })
		} else {
			throw new error('Invalid information', 401)
		}
	}

	return {
		upsert,
		login,
	}
}
