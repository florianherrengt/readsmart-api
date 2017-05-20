import { IConfig } from '../src/common/interfaces/Config'
import { development } from './development';
import { production } from './production'

const env = process.env.NODE_ENV || 'development'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const allEnvs = {
  development,
  production
}

const selectedEnv: IConfig = allEnvs[env]

console.log({ selectedEnv })

if (!selectedEnv.postgres) {
  throw new Error('Cannot find postgres in config')
}

if (!selectedEnv.rabbit) {
  throw new Error('Cannot find rabbit in config')
}

export default selectedEnv