import { ApolloServer } from 'apollo-server-express';
import * as fs from 'fs';
import { resolvers } from './resolvers';

/**
 * readFileSyncの使い方がおかしい
 */
const typeDefs = fs.readFileSync(
  process.cwd() + '/apps/api/src/typeDefs.graphql',
  'utf8'
);

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
