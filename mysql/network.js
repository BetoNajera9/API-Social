import express from 'express'

import store from '../store/mysql'
import response from '../network/response'

const router = express.Router()

router.get('/:table', async (req, res, next) => {
	try {
		const data = await store.list(req.params.table)
		response.succes(req, res, data, 200)
	} catch (err) {
		response.error(req, res, 'Mysql Error', 401, err)
	}
})

router.get('/:table/:id', async (req, res, next) => {
	try {
		const data = await store.get(req.params.table, req.params.id)
		response.succes(req, res, data, 200)
	} catch (err) {
		response.error(req, res, 'Mysql Error', 401, err)
	}
})

router.post('/:table', async (req, res, next) => {
	try {
		const data = await store.insert(req.params.table, req.body)
		response.succes(req, res, data, 200)
	} catch (err) {
		response.error(req, res, 'Mysql Error', 401, err)
	}
})

router.post('/query/:table', async (req, res, next) => {
	try {
		const data = await store.query(
			req.params.table,
			req.body.query,
			req.body.join
		)
		response.succes(req, res, data, 200)
	} catch (err) {
		response.error(req, res, 'Mysql Error', 401, err)
	}
})

router.put('/:table', async (req, res, next) => {
	try {
		const data = await store.update(req.params.table, req.body)
		response.succes(req, res, data, 200)
	} catch (err) {
		response.error(req, res, 'Mysql Error', 401, err)
	}
})

export default router
