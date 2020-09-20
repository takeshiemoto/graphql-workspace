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

  const client = await MongoClient.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers.authorization;
      const currentUser = await db.collection('users').findOne({ githubToken });
      return {
        db,
        currentUser,
      };
    },
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
