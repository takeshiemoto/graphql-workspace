import React from 'react';
import { ALL_USER } from './queries';
import { useQuery } from '@apollo/client';
import { User } from '@graphql-workspace/api-interfaces';
import UserList from './components/UserList';

interface AllUserData {
  totalUsers: number;
  allUsers: User[];
}

export const App = () => {
  const { loading, error, data, refetch } = useQuery<AllUserData>(ALL_USER);
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
