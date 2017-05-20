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
        conn = await connect('amqp://localhost')
        ch = await conn.createChannel()
        Object.keys(queues).forEach(async queue => {
            await ch.assertQueue[queue]
        })
    } catch (error) {
        console.error('Cannot init RabbitMQ', error)
        throw new Error(error)
    }
}

export { init, conn, ch }
