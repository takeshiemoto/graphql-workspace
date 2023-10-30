import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';
import { ArtistListItemFragment$key } from './__generated__/ArtistListItemFragment.graphql';
import { ListItem } from '@chakra-ui/react';

const ArtistListItemFragment = graphql`
  fragment ArtistListItemFragment on artists {
    bio
    birth_date
    created_at
    id
    name
    updated_at
  }
`;

type Props = {
  fragmentRef: ArtistListItemFragment$key;
  onClick: (id: string) => void;
};

export function ArtistListItem(props: Props) {
  const { name, id } = useFragment(ArtistListItemFragment, props.fragmentRef);

  const handleClick = () => {
    props.onClick(id);
  };

  return <ListItem onClick={handleClick}>{name}</ListItem>;
}
