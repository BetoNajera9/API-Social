import express from 'express'

import response from '../network/response'
import store from '../store/redis'

const router = express.Router()

router.get('/:table', async (req, res, next) => {
	try {
		const list = await store.list(req.params.table)
		response.succes(req, res, list, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.get('/:table/:id', async (req, res, next) => {
	try {
		const user = await store.get(req.params.table, req.params.id)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.put('/:table', async (req, res, next) => {
	try {
		const data = await store.upsert(req.params.table, req.body)
		response.succes(req, res, data, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

export default router
