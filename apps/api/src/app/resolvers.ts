import fetch from 'node-fetch';
import { GraphQLScalarType } from 'graphql';
import { IntValueNode } from 'graphql/language/ast';
import { authorizeWithGitHub } from './helpers';
import { Resolvers } from './types/resplver-types';

export const resolvers: Resolvers = {
  Query: {
    me: (parent, args, { currentUser }) => currentUser,
    totalPhotos: (parent, args, { db }) =>
      db.collection('photos').estimatedDocumentCount(),
    allPhotos: (parent, args, { db }) =>
      db.collection('photos').find().toArray(),
    totalUsers: (parent, args, { db }) =>
      db.collection('users').estimatedDocumentCount(),
    allUsers: (parent, args, { db }) => db.collection('users').find().toArray(),
  },
  Mutation: {
    async githubAuth(parent, { code }, { db }) {
      const {
        message,
        access_token,
        avatar_url,
        login,
        name,
      } = await authorizeWithGitHub({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      });

      if (message) {
        throw new Error(message);
      }

      const latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avatar: avatar_url,
      };

      const {
        ops: [user],
      } = await db
        .collection('users')
        .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });
      return {
        user,
        token: access_token,
      };
    },
    async addFakeUsers(root, { count }, { db }) {
      const randomUserApi = `https://randomuser.me/api/?results=${count}`;
      const { results } = await fetch(randomUserApi).then((res) => res.json());
      const users = results.map((r) => ({
        githubLogin: r.login.username,
        name: `${r.name.first} ${r.name.last}`,
        avatar: r.picture.thumbnail,
        githubToken: r.login.sha1,
      }));

      await db.collection('users').insert(users);

      return users;
    },
    async fakeUserAuth(parent, { githubLogin }, { db }) {
      const user = await db.collection('users').findOne({ githubLogin });
      if (!user) {
        throw new Error(`Cannot find user with githubLogin ${githubLogin}`);
      }
      return {
        token: user.githubToken,
        user,
      };
    },
  },
  Photo: {
    id: (parent) => parent.id,
    url: (parent) => `/img/photos/${parent.id}.jpg`,
  },
  User: {},
  DateTime: new GraphQLScalarType({
    name: `DateTime`,
    description: `A valid date time value`,
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast: IntValueNode) => ast.value,
  }),
};
