import { IConfig } from '../src/common/interfaces/Config'
export const production: IConfig = {
    postgres: process.env.DATABASE_URL,
    rabbit: process.env.CLOUDAMQP_URL
}