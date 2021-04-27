import { nanoid } from 'nanoid'

const TABLA = 'post'

export default (injectedStore) => {
	let store = injectedStore
	let exist = false
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
			const post = {
				text: body.text,
			}

			if (body.id) {
				post.id = body.id
				exist = true
			} else {
				post.id = nanoid()
				post.author = body.author
			}

			return store.upsert(TABLA, post, exist)
		} catch (err) {
			console.error(err)
		}
	}

	return {
		list,
		get,
		upsert,
	}
}
