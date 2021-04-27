import remote from './remote'
import config from '../config/envServer'

export default new remote(config.mysqlService.host, config.mysqlService.port)
