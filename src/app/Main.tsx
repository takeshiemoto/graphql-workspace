import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from 'react-relay';
import { ArtistList } from './ArtistList';
import { MainQuery as MainQueryType } from './__generated__/MainQuery.graphql';

const MainQuery = graphql`
  query MainQuery {
    ...ArtistListFragment
  }
`;

export function Main() {
  const data = useLazyLoadQuery<MainQueryType>(MainQuery, {});
  return (
    <main>
      <ArtistList fragmentRef={data} />
    </main>
  );
}

export default Main;
