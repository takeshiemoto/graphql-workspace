import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from 'react-relay';
import { ArtistDetailQuery as QueryType } from './__generated__/ArtistDetailQuery.graphql';

const ArtistDetailQuery = graphql`
  query ArtistDetailQuery($id: ID!) {
    node(id: $id) {
      ... on artists {
        id
        name
      }
    }
  }
`;

type Props = {
  id: string;
};

export function ArtistDetail(props: Props) {
  const result = useLazyLoadQuery<QueryType>(ArtistDetailQuery, {
    id: props.id,
  });

  if (!result.node) {
    return null;
  }

  return <div>{result.node.name}</div>;
}
