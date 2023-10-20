import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from 'react-relay';

const InitQuery = graphql`
  query Artists {
    artists_connection {
      edges {
        node {
          id
          name
          bio
        }
      }
    }
  }
`;

export function NxWelcome({ title }: { title: string }) {
  const data = useLazyLoadQuery(InitQuery, {});
  console.log(data);
  return <div>Hello world</div>;
}

export default NxWelcome;
