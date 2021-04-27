import { nanoid } from 'nanoid'

import auth from '../auth'

const TABLA = 'user'

export default (injectedStore) => {
	let store = injectedStore
	if (!store) {
		store = require('../../../store/dummy')
	}

	const list = () => {
		return store.list(TABLA)
	}

	const get = (id) => {
		return store.get(TABLA, id)
	}

	const upsert = async (body) => {
		try {
			const user = {
				name: body.name,
				username: body.username,
			}

			if (body.id) {
				user.id = body.id
			} else {
				user.id = nanoid()
			}

			if (body.password || body.username) {
				await auth.upsert({
					id: user.id,
					username: user.username,
					password: body.password,
				})
			}

			return store.upsert(TABLA, user)
		} catch (err) {
			console.error(err)
		}
	}

	const remove = (id) => {
		return store.remove(TABLA, id)
	}

	return {
		list,
		get,
		upsert,
		remove,
	}
}
