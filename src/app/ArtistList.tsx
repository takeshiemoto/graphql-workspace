import { graphql } from 'relay-runtime';
import { usePaginationFragment } from 'react-relay';
import { ArtistListFragment$key } from './__generated__/ArtistListFragment.graphql';
import { Button, Stack, UnorderedList } from '@chakra-ui/react';
import { ArtistListItem } from './ArtistListItem';

const ArtistListFragment = graphql`
  fragment ArtistListFragment on query_root
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
  )
  @refetchable(queryName: "ArtistListFragmentQuery") {
    artists_connection(first: $count, after: $cursor)
      @connection(key: "ArtistListFragment_artists_connection") {
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
  const { data, hasNext, loadNext } = usePaginationFragment(
    ArtistListFragment,
    props.fragmentRef
  );

  const handleClickMore = () => {
    loadNext(5);
  };

  return (
    <Stack spacing={4} m={10}>
      <UnorderedList>
        {data.artists_connection.edges.map((edge) => (
          <ArtistListItem fragmentRef={edge.node} key={edge.node.id} />
        ))}
      </UnorderedList>

      {hasNext && <Button onClick={handleClickMore}>More</Button>}
    </Stack>
  );
}
