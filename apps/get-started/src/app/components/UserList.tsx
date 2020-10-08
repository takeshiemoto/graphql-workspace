import React from 'react';
import styled from 'styled-components';
import UserListItem from './UserListItem';
import {
  AllUsersQuery,
  useAddFakeUsersMutation,
} from '@graphql-workspace/graphql';

export interface UserListProps {
  allUserQuery: AllUsersQuery;
}

const StyledUserList = styled.div``;

export const UserList = ({
  allUserQuery: { allUsers, totalUsers },
}: UserListProps) => {
  const [addFakeUsersMutation] = useAddFakeUsersMutation();
  return (
    <StyledUserList>
      <p>{totalUsers} Users</p>
      <button onClick={() => addFakeUsersMutation({ variables: { count: 1 } })}>
        Add Fake User
      </button>
      <div>
        {allUsers.map(({ avatar, githubLogin, name }) => (
          <UserListItem avatar={avatar} name={name} key={githubLogin} />
        ))}
      </div>
    </StyledUserList>
  );
};

export default UserList;
