import React from 'react';
import styled from 'styled-components';
import UserListItem from './UserListItem';

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
      <div>
        {users.map(({ avatar, githubLogin, name }) => (
          <UserListItem avatar={avatar} name={name} key={githubLogin} />
        ))}
      </div>
    </StyledUserList>
  );
};

export default UserList;
