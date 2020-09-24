import React from 'react';
import { User } from '@graphql-workspace/api-interfaces';
import { useMutation } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import styled from 'styled-components';
import {
  ADD_FAKE_USERS_MUTATION,
  AddUsersQueryTypes,
  AllUserQueryType,
} from '../queries';
import UserListItem from './UserListItem';

export interface UserListProps {
  count: number;
  users: User[];
  reFetchUsers?: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllUserQueryType>>;
}

interface AddUsersVariables {
  count: number;
}

const StyledUserList = styled.div`
  color: gray;
`;

export const UserList = ({ count, reFetchUsers, users }: UserListProps) => {
  const [addFakeUsers] = useMutation<AddUsersQueryTypes, AddUsersVariables>(
    ADD_FAKE_USERS_MUTATION
  );
  return (
    <StyledUserList>
      <p>{count} Users</p>
      <button onClick={() => reFetchUsers()}>ReFetch Users</button>
      <button onClick={() => addFakeUsers({ variables: { count: 1 } })}>
        Add Fake User
      </button>
      <div>
        {users.map(({ avatar, githubLogin, name }) => (
          <UserListItem avatar={avatar} name={name} key={githubLogin} />
        ))}
      </div>
    </StyledUserList>
  );
};

export default UserList;
