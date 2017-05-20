import { IContext } from '../common/interfaces/Context'
import { pgPool } from '../common/pgPool'
import * as express from 'express';
import * as rabbit from '../common/rabbit'
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import schema from './schema'
import * as agent from 'superagent'

import { LinkFetcher } from '../common/LinkFetcher'
import { PostsRepository } from '../common/repositories/posts'

// class App {
//     constructor(public rabbit: rabbit) {

//     }
// }

const linkFetcher = new LinkFetcher(agent, rabbit.ch)
const postsRepository = new PostsRepository(pgPool, linkFetcher)
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const context: IContext = {
  postsRepository
}

app.use('/graphql', graphqlExpress({
  schema,
  context
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

// app.get('/', (request, response) => {
//   response.json({ ok: 1 });
// });

export { app };

