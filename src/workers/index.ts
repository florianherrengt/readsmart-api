import { init, ch } from '../common/rabbit'
import * as pgPool from '../common/pgPool'
import * as agent from 'superagent'
import { Channel } from 'amqplib'

import { PostsPopulator } from './PostsPopulator'

const workers = {
    PostsPopulator
}

export async function start(workerName: string) {
    try {
        await init()
        const worker = new workers[workerName](pgPool, ch, agent)
        console.log(workerName, 'started')
    } catch (error) {
        console.error(error)
    }
}