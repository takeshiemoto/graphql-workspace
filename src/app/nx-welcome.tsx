import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from 'react-relay';

const InitQuery = graphql`
  query InitQuery {
    artists {
      id
      name
    }
  }
`;

export function NxWelcome({ title }: { title: string }) {
  const data = useLazyLoadQuery(InitQuery, {});
  console.log(data);
  return <div>Hello world</div>;
}

export default NxWelcome;
