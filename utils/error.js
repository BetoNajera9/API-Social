class error extends Error {
	constructor(message, code) {
		super(message)
		if (code) {
			this.statusCode = code
		}
	}
}

export default error
