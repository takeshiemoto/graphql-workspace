import React from 'react';
import { ALL_USER, AllUserQueryType } from './queries';
import { useQuery } from '@apollo/client';
import UserList from './components/UserList';

export const App = () => {
  const { loading, error, data, refetch } = useQuery<AllUserQueryType>(
    ALL_USER
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <UserList
      count={data.totalUsers}
      users={data.allUsers}
      reFetchUsers={refetch}
    />
  );
};

export default App;
