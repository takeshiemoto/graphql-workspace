import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import UserListItem from './UserListItem';
import { ADD_FAKE_USERS_MUTATION, ROOT_QUERY } from '../app';

export interface UserListProps {
  count: number;
  users: Array<{
    githubLogin: string;
    name: string;
    avatar: string;
  }>;
  reFetchUsers: () => void;
}

const StyledUserList = styled.div`
  color: gray;
`;

export const UserList = ({ count, reFetchUsers, users }: UserListProps) => {
  return (
    <StyledUserList>
      <p>{count} Users</p>
      <button onClick={() => reFetchUsers()}>ReFetch Users</button>
      <Mutation
        mutation={ADD_FAKE_USERS_MUTATION}
        refetchQueries={[{ query: ROOT_QUERY }]}
        variables={{ count: 1 }}
      >
        {(addFakeUsers) => (
          <button onClick={addFakeUsers}>Add Fake User</button>
        )}
      </Mutation>
      <div>
        {users.map(({ avatar, githubLogin, name }) => (
          <UserListItem avatar={avatar} name={name} key={githubLogin} />
        ))}
      </div>
    </StyledUserList>
  );
};

export default UserList;
