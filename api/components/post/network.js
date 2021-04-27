import express from 'express'

import response from '../../../network/response'
import controller from './index'
import secure from '../user/secure'

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

router.post('/', secure('follow'), async (req, res, next) => {
	try {
		const newPost = {
			author: req.user.id,
			text: req.body.text,
		}

		const user = await controller.upsert(newPost)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

router.patch('/:id', secure('follow'), async (req, res, next) => {
	try {
		const modifyPost = {
			id: req.params.id,
			text: req.body.text,
		}
		const user = await controller.upsert(modifyPost)
		response.succes(req, res, user, 200)
	} catch (err) {
		response.error(req, res, 'error', 500, err)
	}
})

export default router
