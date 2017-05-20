import { IConfig } from '../src/common/interfaces/Config'
import { development } from './development';

const env = process.env.NODE_ENV || 'development'

const allEnvs = {
  development
}

const selectedEnv: IConfig = allEnvs[env]

export default selectedEnv