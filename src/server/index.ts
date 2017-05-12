import * as agent from 'superagent'
import * as rabbit from '../common/rabbit'
import { LinkFetcher } from '../common/LinkFetcher';
import { app } from './server';

Promise.all([
    rabbit.init(),
    app.listen(3000)
]).then(() => {
    console.log('rabbitmq is ready');
    console.log('server listing on port 3000')
    const linkFetcher = new LinkFetcher(agent, rabbit.ch);
    return linkFetcher.getReddit('javascript').then(posts => {
        console.log(posts)
    });
}).catch(error => {
    console.log(error)
})