import { init, ch } from '../common/rabbit'
import { Pool } from 'pg';
import * as agent from 'superagent'
import { Channel } from 'amqplib'
import { IPost } from '../common/interfaces/Post'
import { INewspaperResponse } from '../common/interfaces/NewspaperResponse'

export class PostsPopulator {
    constructor(
        public pgPool: Pool,
        public ch: Channel,
        public agent: agent.SuperAgent<agent.Request>
    ) {
        this.ch.consume('populate-posts', this.process.bind(this))
    }
    async process(msg) {
        try {
            if (msg) {
                const { type, posts }: { type: string, posts: [IPost] } = JSON.parse(msg.content.toString())
                if (!type || !posts) { return false }
                console.log('PostsPopulator.process', { type, posts })
                if (!posts.length) { return false }
                await Promise.all(
                    posts.map(post =>
                        this.agent.get(`https://dj96a3dxm6.execute-api.us-east-1.amazonaws.com/prod?url=${post.url}`).then(response => {
                            const { text, top_image }: INewspaperResponse = response.body;
                            return this.pgPool.query(
                                `INSERT INTO posts (title, url, type, image, text) VALUES ($1, $2, $3, $4, $5)`,
                                [post.title, post.url, type, top_image, encodeURIComponent(text)]
                            )
                        })
                    )
                )
                ch.ack(msg)
                console.log('completed')
            }
        } catch (error) {
            console.error(error)
        }
    }
}