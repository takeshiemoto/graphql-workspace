import React from 'react';
import UserList from './components/UserList';
import { useAllUsersQuery } from '@graphql-workspace/graphql';

export const App = () => {
  const { data, loading, error } = useAllUsersQuery({
    variables: {},
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return <UserList allUserQuery={data} />;
};

export default App;
