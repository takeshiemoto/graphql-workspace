import { graphql } from 'relay-runtime';
import { useRefetchableFragment } from 'react-relay';
import { Input, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { BandListFragment$key } from './__generated__/BandListFragment.graphql';
import { ChangeEvent, useTransition } from 'react';

const BandListFragment = graphql`
  fragment BandListFragment on query_root
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int" }
    name: { type: "String", defaultValue: "" }
  )
  @refetchable(queryName: "ArtistSearchFragmentQuery") {
    bands_connection(
      first: $count
      after: $cursor
      where: { name: { _like: $name } }
    ) @connection(key: "BandListFragment_bands_connection") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type Props = {
  fragmentRef: BandListFragment$key;
};

export function BandList(props: Props) {
  const [isPending, startTransition] = useTransition();
  /**
   * 引数を変更して再度クエリを実行したいケースでは、useRefetchableFragmentを使う
   */
  const [data, refetch] = useRefetchableFragment(
    BandListFragment,
    props.fragmentRef
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const name = `%${e.target.value}%`;
      refetch({ name });
    });
  };

  return (
    <Stack spacing={4}>
      <Input placeholder="Search" onChange={handleChange} />
      <UnorderedList>
        {data.bands_connection.edges.map((edge) => (
          <ListItem key={edge.node.id}>{edge.node.name}</ListItem>
        ))}
      </UnorderedList>

      {isPending && <Text>Loading...</Text>}
    </Stack>
  );
}
