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
};

export function ArtistListItem(props: Props) {
  const { name } = useFragment(ArtistListItemFragment, props.fragmentRef);

  return <ListItem>{name}</ListItem>;
}
