import * as agent from 'superagent'
import { flatten } from 'lodash'
import * as pgPool from '../common/pgPool'
import { Channel } from 'amqplib'
import { queues } from '../common/rabbit'
import { IPost, IQueryResultPosts } from '../common/interfaces/Post'

export class LinkFetcher {
    constructor(
        public agent: agent.SuperAgent<agent.Request>,
        public ch: Channel
    ) {
        setTimeout(() => {
            console.log(this.ch)
        }, 2000)
    }
    async getExistingPosts(type: string): Promise<IPost[]> {
        const results: IQueryResultPosts = await pgPool.query('SELECT * FROM posts WHERE type = $1', ['reddit']);
        return results.rows
    }
    async handler({ type, posts }: { type: string, posts: any }): Promise<{ existingsPosts: IPost[], postsToInsert: IPost[] }> {
        const existingsPosts = await this.getExistingPosts(type)
        const existingsPostsUrl = existingsPosts.map(({ url }) => url)
        const postsToInsert = posts.filter(post => !~existingsPostsUrl.indexOf(post.url))
        this.ch.sendToQueue(queues.POPULATE_POSTS, new Buffer(JSON.stringify({
            type,
            posts: postsToInsert
        })))
        return { existingsPosts, postsToInsert }
    }
    async getReddit(sub: string): Promise<{ existingsPosts: IPost[], postsToInsert: IPost[] }> {
        console.log(`LinkFetcher.getReddit(${sub})`)
        const response = await this.agent
            .get(`https://www.reddit.com/r/${sub}.json`)
            .set('User-Agent', 'readsmartserver4z6z826Yj84Qmc99qJe6');
        const { data: { children: rawPosts } } = await response.body;
        const posts = rawPosts
            .filter(({ data: { distinguished } }) => distinguished !== 'moderator')
            .map(({ data: { url, title, ups } }) => ({ url, title, ups }))
            .filter(({ url }) => url);
        return await this.handler({ posts, type: `reddit:${sub}` })
    }
}