import { IContext } from '../../../common/interfaces/Context'

export const resolvers = {
    Query: {
        async redditPosts(root, { sub }, context: IContext) {
            const results = await context.postsRepository.getByReddit(sub)
            return {
                count: results.postsToInsert.length + results.existingsPosts.length,
                posts: results.existingsPosts
            }
        }
    }
}