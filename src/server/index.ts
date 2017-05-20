import * as agent from 'superagent'
import * as rabbit from '../common/rabbit'
import * as http from 'http'
import { app } from './server';
import * as socketIO from '../common/io'
import { INewPostsMsg } from '../common/interfaces/NewPostsMsg'

const server = http.createServer(app)
socketIO.init(server)

Promise.all([
    rabbit.init(),
    new Promise((resolve, reject) => server.listen(3000, '0.0.0.0', (error) => error ? reject(error) : resolve()))
]).then(() => {
    console.log(new Date())
    console.log('rabbitmq is ready');
    console.log('server listing on port 3000')
    rabbit.ch.consume(rabbit.queues.NEW_POSTS, msg => {
        const newSourcesMsg: INewPostsMsg = JSON.parse(msg.content.toString())
        socketIO.io.emit(rabbit.queues.NEW_POSTS + newSourcesMsg.type)
    })
}).catch(error => {
    console.log(error)
})