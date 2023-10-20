import Main from './Main';
import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from '../environment';
import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export function App() {
  return (
    <Suspense>
      <RelayEnvironmentProvider environment={environment}>
        <ChakraProvider>
          <Main />
        </ChakraProvider>
      </RelayEnvironmentProvider>
    </Suspense>
  );
}

export default App;
