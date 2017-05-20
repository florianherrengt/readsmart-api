export const schema = [`
    type PostResponse {
        # Number of total posts
        count: Int

        # The actual posts
        posts: [Post]
    }
    type Post {
        # The title extracted from the post
        title: String

        # Raw version text only of the post with line return
        text: String

        # Main image from the post
        image: String

        # When the post was inserted in the DB
        createdAt: String
    }
    type Query {
        redditPosts(sub: String!): PostResponse
    }
    schema {
        query: Query
    }
`]