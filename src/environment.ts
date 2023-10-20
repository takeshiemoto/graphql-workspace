import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

export const fetchQuery: FetchFunction = (operation, variables) => {
  return fetch('http://localhost:8080/v1beta1/relay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => response.json());
};

const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

export const environment = new Environment({
  network,
  store,
});
