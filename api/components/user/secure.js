import auth from '../../../auth'

const checkout = (action) => {
	const middleware = (req, res, next) => {
		switch (action) {
			case 'update':
				const owner = req.body.id
				auth.check.own(req, owner)
				next()
				break
			default:
				next()
		}
	}
	return middleware
}

export default checkout
