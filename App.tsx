
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useCallback, useEffect, useState } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { SetupService } from './src/services/SetupService';
import { QueueInitialTracksService } from './src/services/QueueInitialTracksService';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false)
  
  useEffect(() => {
    async function prepare() {
      try {
        await SetupService();
        await QueueInitialTracksService();
        await mobileAds().initialize();
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);


  if (!appIsReady) {
    return null;
  }

  return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Navigation colorScheme={colorScheme} />
        </View>
        <StatusBar />
      </SafeAreaProvider>
    );
  
}
