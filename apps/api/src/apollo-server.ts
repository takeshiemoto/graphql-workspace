import { ApolloServer, gql } from 'apollo-server-express';
import { photos, users } from './data';

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
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory
    postedBy: User!
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
  },
  User: {
    postedPhotos: (parent) => {
      return photos.filter((p) => p.githubUser === parent.githubLogin);
    },
  },
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
