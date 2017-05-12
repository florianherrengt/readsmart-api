import { connect, Channel, Connection } from 'amqplib'

let conn: Connection;
let ch: Channel;
const init = async () => {
    if (conn) { return Promise.resolve() }
    try {
        conn = await connect('amqp://localhost')
        ch = await conn.createChannel()
        await ch.assertQueue('populate-posts')
    } catch (error) {
        console.error('Cannot init RabbitMQ', error)
    }
}

export { init, conn, ch }
