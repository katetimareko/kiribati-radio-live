import { registerRootComponent } from "expo"
import App from "./App"
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/services/PlaybackService'
import messaging from '@react-native-firebase/messaging';
TrackPlayer.registerPlaybackService(() => PlaybackService)
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

registerRootComponent(App)


