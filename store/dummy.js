const db = {
	user: [
		{
			id: '1',
			name: 'Carlos',
		},
	],
}

const list = async (table) => {
	try {
		return (await db[table]) ?? []
	} catch (err) {
		console.error(err)
	}
}

const get = async (table, id) => {
	try {
		let col = await list(table)
		return col.filter((item) => item.id === id)[0] ?? null
	} catch (err) {
		console.error(err)
	}
}

const upsert = async (table, data) => {
	try {
		if (!db[table]) db[table] = []

		await db[table].push(data)

		return get(table, data.id)
	} catch (err) {
		console.error(err)
	}
}

const remove = async (table, id) => {
	try {
		let col = await list(table)
		const removed = col.filter((item) => item.id === id)[0]

		if (removed) {
			const index = col.indexOf(removed)
			db[table].splice(index, 1)
		}

		return removed
	} catch (err) {
		console.error(err)
	}
}

const query = async (table, q) => {
	let col = await list(table)
	let key = Object.keys(q)[0]
	return col.filter((item) => item[key] === q[key])[0] ?? null
}

export default {
	list,
	get,
	upsert,
	remove,
	query,
}
