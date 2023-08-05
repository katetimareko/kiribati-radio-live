import TrackPlayer, { Track } from 'react-native-track-player';

export const QueueInitialTracksService = async (): Promise<void> => {
  await TrackPlayer.add(stations());
};

const stations = () : Track => {
    return {
        url: "http://streamer5.rightclickitservices.com:9790/stream",
        title: 'Radio Kiribati Live',
        artist: 'AM Radio',
        artwork: require('../../assets/images/flag.jpeg'),
        duration: 143
    }
}