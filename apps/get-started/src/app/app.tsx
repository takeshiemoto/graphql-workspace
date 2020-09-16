import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

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
      {({ data, loading }) =>
        loading ? (
          <p>Loading...</p>
        ) : (
          <UserList count={data.totalUsers} users={data.allUsers} />
        )
      }
    </Query>
  );
};

interface UserListProps {
  count: number;
  users: Array<{
    githubLogin: string;
    name: string;
    avatar: string;
  }>;
}
const UserList = ({ count, users }: UserListProps) => {
  return (
    <>
      <p>{count} Users</p>
      <ul>
        {users.map((user) => (
          <li key={user.githubLogin}>
            <img src={user.avatar} width={48} height={48} alt={''} />
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
