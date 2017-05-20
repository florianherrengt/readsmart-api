import { IConfig } from '../src/common/interfaces/Config'
export const development: IConfig = {
    postgres: 'postgres://postgres@localhost:5432/postgres',
    rabbit: 'amqp://localhost'
}