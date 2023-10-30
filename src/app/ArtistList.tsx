import { graphql } from 'relay-runtime';
import { usePaginationFragment } from 'react-relay';
import { ArtistListFragment$key } from './__generated__/ArtistListFragment.graphql';
import { Button, Stack, UnorderedList } from '@chakra-ui/react';
import { ArtistListItem } from './ArtistListItem';
import { useState } from 'react';
import { ArtistDetail } from './ArtistDetail';

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
  const [selectedArtistId, setSelectedArtistId] = useState<string | undefined>(
    undefined
  );

  const { data, hasNext, loadNext } = usePaginationFragment(
    ArtistListFragment,
    props.fragmentRef
  );

  const handleClickMore = () => {
    loadNext(5);
  };

  const handleArtistClick = (id: string) => {
    setSelectedArtistId(id);
  };

  return (
    <Stack spacing={4}>
      <UnorderedList>
        {data.artists_connection.edges.map((edge) => (
          <ArtistListItem
            fragmentRef={edge.node}
            key={edge.node.id}
            onClick={handleArtistClick}
          />
        ))}
      </UnorderedList>

      {selectedArtistId && <ArtistDetail id={selectedArtistId} />}

      {hasNext && <Button onClick={handleClickMore}>More</Button>}
    </Stack>
  );
}
