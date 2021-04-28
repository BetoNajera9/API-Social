import remote from './remote'
import config from '../config/envServer'

export default new remote(config.cacheService.host, config.cacheService.port)
