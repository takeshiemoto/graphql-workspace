import React, { useEffect } from 'react';
import ApolloClient, { gql } from 'apollo-boost';

export const App = () => {
  const client = new ApolloClient({ uri: 'http://localhost:4200/graphql' });
  const query = gql`
    query listUsers {
      totalPhotos
      totalUsers
    }
  `;
  useEffect(() => {
    client.query({ query }).then(console.log).catch(console.error);
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to get-started!</h1>
    </div>
  );
};

export default App;
