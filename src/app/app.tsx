import Main from './Main';
import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from '../environment';
import { Suspense } from 'react';
import { ChakraProvider, Spinner } from '@chakra-ui/react';

export function App() {
  return (
    <Suspense fallback={<Spinner size={'lg'} />}>
      <RelayEnvironmentProvider environment={environment}>
        <ChakraProvider>
          <Main />
        </ChakraProvider>
      </RelayEnvironmentProvider>
    </Suspense>
  );
}

export default App;
