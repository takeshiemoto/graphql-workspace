import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import UserList from './components/UserList';

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
export const App = () => {
  return (
    <Query query={ROOT_QUERY}>
      {({ data, loading, refetch }) =>
        loading ? (
          <p>Loading...</p>
        ) : (
          <UserList
            count={data.totalUsers}
            users={data.allUsers}
            reFetchUsers={refetch}
          />
        )
      }
    </Query>
  );
};

export default App;
