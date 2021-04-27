import response from './response'

const errors = (err, req, res, next) => {
	console.error(`[error]: ${err}`)

	const message = err.message ?? 'Intern error'
	const status = err.statusCode ?? 500

	response.error(req, res, message, status)
}

export default errors
