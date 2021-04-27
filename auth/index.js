import jwt from 'jsonwebtoken'

import config from '../config/envServer'
import error from '../utils/error'

const sign = (data) => {
	return jwt.sign(data, config.jwt.secret)
}

const verify = (token) => {
	try {
		return jwt.verify(token, config.jwt.secret)
	} catch (err) {
		console.error(err)
	}
}

const getToken = (auth) => {
	if (!auth) throw new error('Dont have token', 401)

	if (auth.indexOf('Bearer') === -1) throw new error('Invalid format', 400)

	let token = auth.replace('Bearer ', '')
	return token
}

const decodeHeader = (req) => {
	const auth = req.headers.authorization ?? ''
	const token = getToken(auth)
	const decoded = verify(token)

	req.user = decoded

	return decoded
}

const check = {
	own: (req, owner) => {
		const decoded = decodeHeader(req)
		if (decoded.id !== owner) {
			throw new error('You cant do this', 401)
		}
	},
	logged: (req) => {
		const decoded = decodeHeader(req)
	},
}

export default { sign, check }
