import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import useCachedResources from 'hooks/useCachedResources';
import useColorScheme from 'hooks/useColorScheme';
import Navigation from 'navigation';
import useStore from 'store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const store = useStore();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete || !store) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <PaperProvider>
          <Navigation colorScheme={colorScheme} />
        </PaperProvider>
      </StoreProvider>
      <StatusBar />
    </SafeAreaProvider>
  );
}
