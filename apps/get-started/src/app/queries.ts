import { gql } from '@apollo/client';
import { User } from '@graphql-workspace/api-interfaces';

export interface AllUserQueryType {
  totalUsers: number;
  allUsers: User[];
}

export const ALL_USER = gql`
  query allUsers {
    totalUsers
    allUsers {
      githubLogin
      name
      avatar
    }
  }
`;

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      githubLogin
      name
      avatar
    }
  }
`;

export interface AddUsersQueryTypes {
  addFakeUsers: Pick<User, 'githubLogin' | 'name' | 'avatar'>[];
}
export const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;
