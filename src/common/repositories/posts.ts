import { Pool } from 'pg'
import * as agent from 'superagent'
import * as rabbit from '../../common/rabbit'
import { LinkFetcher } from '../../common/LinkFetcher'

export class PostsRepository {
    constructor(public pgPool: Pool, public linkFetcher: LinkFetcher) {

    }
    async getByReddit(sub) {
        const results = await this.linkFetcher.getReddit(sub)
        return results
    }
}