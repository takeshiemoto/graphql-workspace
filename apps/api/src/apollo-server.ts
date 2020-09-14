import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory
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
const photos = [];
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
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
  },
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
