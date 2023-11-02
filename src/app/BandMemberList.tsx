import { graphql } from 'relay-runtime';
import { usePaginationFragment } from 'react-relay';
import { BandMemberListFragment$key } from './__generated__/BandMemberListFragment.graphql';
import { Button, ListItem, Stack, UnorderedList } from '@chakra-ui/react';

const BandMemberListFragment = graphql`
  fragment BandMemberListFragment on artists
  @argumentDefinitions(
    first: { type: Int, defaultValue: 1 }
    after: { type: String }
  )
  @refetchable(queryName: "BandMemberListFragmentQuery") {
    band_members_connection(after: $after, first: $first)
      @connection(key: "BandMemberListFragment_band_members_connection") {
      edges {
        node {
          id
          band {
            name
          }
        }
      }
    }
  }
`;

type Props = {
  fragmentRef: BandMemberListFragment$key;
};

export const BandMemberList = (props: Props) => {
  const { data, loadNext, hasNext } = usePaginationFragment(
    BandMemberListFragment,
    props.fragmentRef
  );

  return (
    <Stack>
      <UnorderedList>
        {data.band_members_connection.edges.map((edge) => (
          <ListItem key={edge.node.id}>{edge.node.band.name}</ListItem>
        ))}
        {hasNext && <Button onClick={() => loadNext(1)}>Load more...</Button>}
      </UnorderedList>
    </Stack>
  );
};
