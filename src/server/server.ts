import { IContext } from '../common/interfaces/Context'
import { pgPool } from '../common/pgPool'
import * as express from 'express';
import { Channel } from 'amqplib'
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import schema from './schema'
import * as agent from 'superagent'

import { LinkFetcher } from '../common/LinkFetcher'
import { PostsRepository } from '../common/repositories/posts'

export class App {
  constructor(public ch: Channel) {

  }
  create() {
    const linkFetcher = new LinkFetcher(agent, this.ch)
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
    return app
  }
}

// app.get('/', (request, response) => {
//   response.json({ ok: 1 });
// });

// export { app };

