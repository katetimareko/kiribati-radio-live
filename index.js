import { registerRootComponent } from "expo"
import App from "./App"
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/services/PlaybackService'
import { setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { messaging } from "./src/helper/firebase";

TrackPlayer.registerPlaybackService(() => PlaybackService)

// Register background handler
setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});


registerRootComponent(App)


