import { photos, tags, users } from '../data';
import { GraphQLScalarType } from 'graphql';
import { IntValueNode } from 'graphql/language/ast';

let id = 0;
export const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    totalUsers: () => users.length,
    allPhotos: () => photos,
    allUsers: () => users,
  },
  Mutation: {
    postPhoto(parent, args) {
      const newPhoto = {
        id: id++,
        ...args.input,
        created: new Date(),
      };
      photos.push(args);
      return newPhoto;
    },
  },
  Photo: {
    // トリビアリゾルバ
    url: (parent) => `http://example.com/img/${parent.id}`,
    postedBy: (parent) => {
      return users.find((u) => u.githubLogin === parent.githubUser);
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
