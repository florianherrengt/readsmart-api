import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { GraphQLSchema } from "graphql";
import schema from './schema'

console.log(schema instanceof GraphQLSchema)

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
  schema
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

// app.get('/', (request, response) => {
//   response.json({ ok: 1 });
// });

export { app };

