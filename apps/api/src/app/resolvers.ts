import fetch from 'node-fetch';
import { photos, tags, users } from '../data';
import { GraphQLScalarType } from 'graphql';
import { IntValueNode } from 'graphql/language/ast';
import { authorizeWithGitHub } from './helpers';

export const resolvers = {
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
    async postPhoto(parent, args, { db, currentUser }) {
      if (!currentUser) {
        throw new Error('only an authorized user can post a photo');
      }
      const newPhoto = {
        ...args.input,
        userID: currentUser.githubLogin,
        created: new Date(),
      };
      const { insertedIds } = await db.collection('photos').insert(newPhoto);
      newPhoto.id = insertedIds[0];
      return newPhoto;
    },
    async githubAuth(parent, { code }, { db }) {
      const {
        message,
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token,
        // eslint-disable-next-line @typescript-eslint/camelcase
        avatar_url,
        login,
        name,
      } = await authorizeWithGitHub({
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: process.env.CLIENT_ID,
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_secret: process.env.CLIENT_SECRET,
        code,
      });

      if (message) {
        throw new Error(message);
      }

      const latestUserInfo = {
        name,
        githubLogin: login,
        // eslint-disable-next-line @typescript-eslint/camelcase
        githubToken: access_token,
        // eslint-disable-next-line @typescript-eslint/camelcase
        avatar: avatar_url,
      };

      const {
        ops: [user],
      } = await db
        .collection('users')
        .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });
      return {
        user,
        // eslint-disable-next-line @typescript-eslint/camelcase
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
    id: (parent) => parent.id || parent._id,
    url: (parent) => `/img/photos/${parent._id}.jpg`,
    postedBy: (parent, args, { db }) => {
      console.log(parent);
      return db.collection(`users`).findOne({ githubLogin: parent.userID });
    },
    taggedUsers: (parent) =>
      tags
        .filter((tag) => tag.photoID === parent.id)
        .map((tag) => tag.userID)
        .map((userId) => users.find((u) => u.githubLogin === userId)),
  },
  User: {
    postedPhotos: (parent) => {
      return photos.filter((p) => p.githubUser === parent.githubLogin);
    },
    inPhotos: (parent) =>
      tags
        .filter((tag) => tag.userID === parent.id)
        .map((tag) => tag.photoID)
        .map((photoId) => photos.find((p) => p.id === photoId)),
  },
  DateTime: new GraphQLScalarType({
    name: `DateTime`,
    description: `A valid date time value`,
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast: IntValueNode) => ast.value,
  }),
};
