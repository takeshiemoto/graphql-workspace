import React from 'react';

import styled from 'styled-components';

export interface UserListItemProps {
  avatar: string;
  name: string;
}

const StyledUserListItem = styled.div`
  color: gray;
`;

export const UserListItem = ({ avatar, name }: UserListItemProps) => {
  return (
    <StyledUserListItem>
      <img src={avatar} width={48} height={48} alt={''} />
      {name}
    </StyledUserListItem>
  );
};

export default UserListItem;
