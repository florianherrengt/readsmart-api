import config from '../../config'
import { connect, Channel, Connection } from 'amqplib'

let conn: Connection;
let ch: Channel;

export const queues = {
    POPULATE_POSTS: 'populate-posts',
    NEW_POSTS: 'new-posts'
}

const init = async () => {
    if (conn) { return Promise.resolve() }
    try {
        conn = await connect(config.rabbit)
        ch = await conn.createChannel()
        await ch.assertQueue(queues.POPULATE_POSTS)
        await ch.assertQueue(queues.NEW_POSTS)
        console.log('All queues created')
    } catch (error) {
        console.error('Cannot init RabbitMQ', error)
        throw new Error(error)
    }
}

export { init, conn, ch }
