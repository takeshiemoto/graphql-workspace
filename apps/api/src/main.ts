import * as express from 'express';
import * as fs from 'fs';
import * as MongoClient from 'mongodb';
import expressPlayground from 'graphql-playground-middleware-express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './app/resolvers';

export const typeDefs = fs.readFileSync('schema.graphql', 'utf8');

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
