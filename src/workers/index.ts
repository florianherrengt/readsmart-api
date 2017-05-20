import { init, ch } from '../common/rabbit'
import { pgPool } from '../common/pgPool'
import * as agent from 'superagent'
import { Channel } from 'amqplib'

import { PostsPopulator } from './PostsPopulator'

const workers = {
    PostsPopulator
}

export async function start(workerName: string) {
    try {
        console.log('Rabbit... starting')
        await init()
        console.log('Rabbit... done')
        console.log(`${workerName}... starting`)
        const worker = new PostsPopulator(pgPool, ch, agent)
        await worker.start()
        console.log(`${workerName}... done`)
    } catch (error) {
        console.error(error)
    }
}

const workerName = process.argv[process.argv.length - 1]
if (!workers[workerName]) {
    throw new Error(`No worker found for ${workerName}. Available: ${Object.keys(workers)}`)
}
start(workerName)