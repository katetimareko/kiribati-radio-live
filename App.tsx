
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { SetupService } from './src/services/SetupService';
import { QueueInitialTracksService } from './src/services/QueueInitialTracksService';
import mobileAds, { AdsConsent, AdsConsentDebugGeography } from 'react-native-google-mobile-ads';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        const consentInfo = await AdsConsent.requestInfoUpdate({
          debugGeography: AdsConsentDebugGeography.EEA,
          testDeviceIdentifiers: ['dd'],
        });

         const resultForm = await AdsConsent.loadAndShowConsentFormIfRequired();
         if (resultForm.canRequestAds) {
           await mobileAds().initialize()
         }
        await SetupService();
        await QueueInitialTracksService();
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
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
