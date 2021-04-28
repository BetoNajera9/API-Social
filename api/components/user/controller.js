import { nanoid } from 'nanoid'

import auth from '../auth'

const TABLA = 'user'

export default (injectedStore, injectedCache) => {
	let store = injectedStore
	let cache = injectedCache
	let exist = false

	if (!store) {
		store = require('../../../store/dummy')
	}
	if (!cache) {
		cache = require('../../../store/dummy')
	}

	const list = async () => {
		let users = await cache.list(TABLA)
		if (!users) {
			console.log('No estaba en cache')
			users = await store.list(TABLA)
			cache.upsert(TABLA, users)
		} else {
			console.log('Traemos de cache')
		}

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
				exist = true
			} else {
				user.id = nanoid()
				if (body.password || body.username) {
					await auth.upsert({
						id: user.id,
						username: user.username,
						password: body.password,
					})
				}
			}

			return store.upsert(TABLA, user, exist)
		} catch (err) {
			console.error(err)
		}
	}

	const remove = (id) => {
		return store.remove(TABLA, id)
	}

	const follow = (from, to) => {
		return store.upsert(
			`${TABLA}_follow`,
			{
				user_from: from,
				user_to: to,
			},
			false
		)
	}

	const following = async (user) => {
		const join = {}
		join[TABLA] = 'user_to'
		const query = { user_from: user }

		return await store.query(TABLA + '_follow', query, join)
	}

	return {
		list,
		get,
		upsert,
		remove,
		follow,
		following,
	}
}
