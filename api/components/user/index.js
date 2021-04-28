import ctrl from './controller'
import config from '../../../config/envServer'

let store, cache
if (config.remoteDB === true) {
	store = require('../../../store/remote-mysql')
	cache = require('../../../store/remote-cache')
} else {
	store = require('../../../store/mysql')
	cache = require('../../../store/redis')
}

export default ctrl(store, cache)
