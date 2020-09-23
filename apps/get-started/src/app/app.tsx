import React from 'react';
import { Query } from 'react-apollo';
import UserList from './components/UserList';
import { ROOT_QUERY } from './queries';

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
