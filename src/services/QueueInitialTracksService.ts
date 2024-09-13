import TrackPlayer, { Track } from 'react-native-track-player';

export const QueueInitialTracksService = async (): Promise<void> => {
  await TrackPlayer.add({
    url: "http://streamer5.rightclickitservices.com:9790/stream",
    title: 'Radio Kiribati Live',
    artist: 'Radio Kiribati MW 1440Khz',
    artwork: require('../../assets/images/flag.jpeg'),
    duration: 143
  });

  await TrackPlayer.add({
    url: "https://streamer5.rightclickitservices.com:19780/stream",
    title: 'Radio Kiribati Live',
    artist: 'AM Radio Kirimati Is FM 89.9',
    artwork: require('../../assets/images/flag.jpeg'),
    duration: 143
  })
};