import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';
import { Control } from './Control';

export const PlayPauseButton: React.FC = () => {
  const playState = usePlaybackState()
  const bufferingDuringPlay = playState === State.Buffering
  const playing = playState === State.Playing

  return bufferingDuringPlay ? (
    <View style={styles.statusContainer}>
      <ActivityIndicator />
    </View>
  ) : (
    !playing ?
      <Control iconName="play-circle-outline" type='primary' onPress={() => TrackPlayer.play()} size={82} style={styles.playPause} />
      :
      <Control iconName="ios-pause-circle-outline" type='primary' size={82} onPress={() => TrackPlayer.pause()} style={styles.playPause} />
  );
};

const styles = StyleSheet.create({
  playPause: {
    width: 120,
    textAlign: 'center',
  },
  statusContainer: {
    height: 40,
    width: 120,
    marginTop: 20,
    marginBottom: 60,
  },
});