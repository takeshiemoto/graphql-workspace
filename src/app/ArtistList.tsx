import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';
import { ArtistListFragment$key } from './__generated__/ArtistListFragment.graphql';
import { UnorderedList } from '@chakra-ui/react';
import { ArtistListItem } from './ArtistListItem';

const ArtistListFragment = graphql`
  fragment ArtistListFragment on query_root {
    artists_connection(order_by: { id: asc }) {
      edges {
        node {
          id
          ...ArtistListItemFragment
        }
      }
    }
  }
`;

type Props = {
  fragmentRef: ArtistListFragment$key;
};

export function ArtistList(props: Props) {
  const results = useFragment(ArtistListFragment, props.fragmentRef);

  return (
    <UnorderedList>
      {results.artists_connection.edges.map((edge) => (
        <ArtistListItem fragmentRef={edge.node} key={edge.node.id} />
      ))}
    </UnorderedList>
  );
}
