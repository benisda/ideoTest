import React from 'react';
import PokedexProvider from './src/contexts/PokedexContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/components/Navigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PokedexProvider>
        <Navigator />
      </PokedexProvider>
    </SafeAreaProvider>
  );
}

export default App;
