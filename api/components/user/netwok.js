import express from 'express'

import secure from './secure'
import response from '../../../network/response'
import controller from './index'

const router = express.Router()

router.get('/', async (req, res, next) => {
	try {
		const list = await controller.list()
		response.succes(req, res, list, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const user = await controller.get(req.params.id)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.get('/:id/following', async (req, res, next) => {
	try {
		const user = await controller.following(req.params.id)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const user = await controller.upsert(req.body)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.post('/follow/:id', secure('follow'), async (req, res, next) => {
	try {
		const user = await controller.follow(req.user.id, req.params.id)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.patch('/', secure('update'), async (req, res, next) => {
	try {
		const user = await controller.upsert(req.body)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const user = await controller.remove(req.params.id)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

export default router
