import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from 'react-relay';
import { ArtistList } from './ArtistList';
import { MainQuery as MainQueryType } from './__generated__/MainQuery.graphql';
import { BandList } from './BandList';
import { Stack } from '@chakra-ui/react';

const MainQuery = graphql`
  query MainQuery {
    ...ArtistListFragment
    ...BandListFragment
  }
`;

export function Main() {
  const data = useLazyLoadQuery<MainQueryType>(MainQuery, {});
  return (
    <Stack m={10} spacing={4}>
      <ArtistList fragmentRef={data} />
      <BandList fragmentRef={data} />
    </Stack>
  );
}

export default Main;
