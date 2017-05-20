import { makeExecutableSchema } from 'graphql-tools';

const schema = [`
    type Query {
        testString: String
    }
    schema {
        query: Query
    }
`]

const resolvers = {
    Query: {
        testString(root, { sourceType }, context) {
            return `Those are posts for ${sourceType}`
        }
    }
}

const executableSchema = makeExecutableSchema({
    typeDefs: [...schema],
    resolvers,
});

export default executableSchema