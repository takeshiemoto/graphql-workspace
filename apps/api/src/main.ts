import * as express from 'express';
import { apolloServer } from './apollo-server';

const app = express();
apolloServer.applyMiddleware({ app });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
});
server.on('error', console.error);
