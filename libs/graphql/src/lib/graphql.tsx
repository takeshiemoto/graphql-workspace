import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A valid date time value */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum PhotoCategory {
  Selfie = 'SELFIE',
  Portrait = 'PORTRAIT',
  Action = 'ACTION',
  Landscape = 'LANDSCAPE',
  Graphic = 'GRAPHIC',
}

export type User = {
  __typename?: 'User';
  githubLogin: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  postedPhotos: Array<Photo>;
  inPhotos: Array<Photo>;
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['ID'];
  url: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  category?: Maybe<PhotoCategory>;
  postedBy: User;
  taggedUsers: Array<User>;
  created: Scalars['DateTime'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  totalPhotos: Scalars['Int'];
  totalUsers: Scalars['Int'];
  allPhotos: Array<Maybe<Photo>>;
  allUsers: Array<Maybe<User>>;
};

export type PostPhotoInput = {
  name: Scalars['String'];
  category?: Maybe<PhotoCategory>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFakeUsers?: Maybe<Array<User>>;
  fakeUserAuth: AuthPayload;
  postPhoto: Photo;
  githubAuth?: Maybe<AuthPayload>;
};

export type MutationAddFakeUsersArgs = {
  count?: Maybe<Scalars['Int']>;
};

export type MutationFakeUserAuthArgs = {
  githubLogin: Scalars['ID'];
};

export type MutationPostPhotoArgs = {
  input: PostPhotoInput;
};

export type MutationGithubAuthArgs = {
  code: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersQuery = { __typename?: 'Query' } & Pick<
  Query,
  'totalUsers'
> & {
    allUsers: Array<
      Maybe<
        { __typename?: 'User' } & Pick<User, 'githubLogin' | 'name' | 'avatar'>
      >
    >;
  };

export type AddFakeUsersMutationVariables = Exact<{
  count: Scalars['Int'];
}>;

export type AddFakeUsersMutation = { __typename?: 'Mutation' } & {
  addFakeUsers?: Maybe<
    Array<
      { __typename?: 'User' } & Pick<User, 'githubLogin' | 'name' | 'avatar'>
    >
  >;
};

export const AllUsersDocument = gql`
  query allUsers {
    totalUsers
    allUsers {
      githubLogin
      name
      avatar
    }
  }
`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>
) {
  return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    baseOptions
  );
}
export function useAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllUsersQuery,
    AllUsersQueryVariables
  >
) {
  return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    baseOptions
  );
}
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<
  typeof useAllUsersLazyQuery
>;
export type AllUsersQueryResult = Apollo.QueryResult<
  AllUsersQuery,
  AllUsersQueryVariables
>;
export const AddFakeUsersDocument = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;
export type AddFakeUsersMutationFn = Apollo.MutationFunction<
  AddFakeUsersMutation,
  AddFakeUsersMutationVariables
>;

/**
 * __useAddFakeUsersMutation__
 *
 * To run a mutation, you first call `useAddFakeUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFakeUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFakeUsersMutation, { data, loading, error }] = useAddFakeUsersMutation({
 *   variables: {
 *      count: // value for 'count'
 *   },
 * });
 */
export function useAddFakeUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddFakeUsersMutation,
    AddFakeUsersMutationVariables
  >
) {
  return Apollo.useMutation<
    AddFakeUsersMutation,
    AddFakeUsersMutationVariables
  >(AddFakeUsersDocument, baseOptions);
}
export type AddFakeUsersMutationHookResult = ReturnType<
  typeof useAddFakeUsersMutation
>;
export type AddFakeUsersMutationResult = Apollo.MutationResult<
  AddFakeUsersMutation
>;
export type AddFakeUsersMutationOptions = Apollo.BaseMutationOptions<
  AddFakeUsersMutation,
  AddFakeUsersMutationVariables
>;
