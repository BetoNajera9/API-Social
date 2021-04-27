const responseSucces = (req, res, message, status) => {
	res.status(status ?? 200).send({
		error: false,
		status: status ?? '',
		body: message,
	})
}

const responseError = (req, res, message, status) => {
	res.status(status ?? 500).send({
		error: true,
		status: status ?? 'Internal server error',
		body: message,
	})
}

export default {
	succes: responseSucces,
	error: responseError,
}
