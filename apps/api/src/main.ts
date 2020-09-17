import * as express from 'express';
import { apolloServer } from './app/apollo-server';
const expressPlayground = require(`graphql-playground-middleware-express`)
  .default;

const app = express();
app.get(`/playground`, expressPlayground({ endpoint: `/graphql` }));
apolloServer.applyMiddleware({ app });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
});
server.on('error', console.error);
