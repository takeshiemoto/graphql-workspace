import { ApolloServer, gql } from 'apollo-server-express';
import { photos, tags, users } from './data';

const typeDefs = gql`
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory
    postedBy: User!
    taggedUsers: [User!]!
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo]!
  }
  input PostPhotoInput {
    name: String!
    category: PhotoCategory = PORTRAIT
    description: String
  }
  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`;

let id = 0;
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto(parent, args) {
      const newPhoto = {
        id: id++,
        ...args.input,
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
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
