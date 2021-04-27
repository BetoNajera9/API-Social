import express from 'express'

import response from '../../../network/response'
import controller from './index'

const router = express.Router()

router.post('/login', async (req, res, next) => {
	try {
		const token = await controller.login(req.body.username, req.body.password)
		response.succes(req, res, token, 200)
	} catch (err) {
		response.error(req, res, 'Innvalid information', 500, err)
	}
})

export default router
