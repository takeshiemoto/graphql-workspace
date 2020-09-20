import * as express from 'express';
import * as fs from 'fs';
import * as MongoClient from 'mongodb';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './app/resolvers';

export const typeDefs = fs.readFileSync(
  process.cwd() + '/apps/api/src/typeDefs.graphql',
  'utf8'
);

const expressPlayground = require(`graphql-playground-middleware-express`)
  .default;

const start = async () => {
  const app = express();

  const host = 'mongodb://localhost:27017';
  const client = await MongoClient.connect(host, { useNewUrlParser: true });
  const db = client.db();
  const context = { db };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  apolloServer.applyMiddleware({ app });

  app.get('/', () => {
    console.log('Welcome to the Photo API');
  });

  app.get(`/playground`, expressPlayground({ endpoint: `/graphql` }));

  const port = process.env.port || 3333;

  const server = app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
  });
  server.on('error', console.error);
};

start();
