import React, { useEffect } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';
import { Control } from './Control';
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import { Ionicons } from '@expo/vector-icons';

const interestialId = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_ANDROID_INTERSTITIAL_ID : process.env.EXPO_PUBLIC_IOS_INTERSTITIAL_ID;

export const PlayPauseButton: React.FC = () => {
  const playState = usePlaybackState()
  const { load, show, isClosed, isLoaded } = useInterstitialAd(__DEV__ ? TestIds.INTERSTITIAL : interestialId!, {
    requestNonPersonalizedAdsOnly: true
  })

  const bufferingDuringPlay = playState === State.Buffering
  const connection = playState === State.Connecting
  const playing = playState === State.Playing
  const paused = playState === State.Paused
  const playerReady = playState === State.Ready

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (isClosed) {
      TrackPlayer.play()
      load()
    }
  }, [isClosed]);

  return bufferingDuringPlay || connection ? (
    <View style={styles.statusContainer}>
      <ActivityIndicator size='large' color='white' />
    </View>
  ) : (
    !playing ?
      <Control type='primary' onPress={() => {
        if (isLoaded && playerReady) {
          show()
        }

        if (playing) {
          TrackPlayer.pause()
        } else if (paused) {
          TrackPlayer.play()
        }
      }} style={styles.playPause}>
        <Ionicons name='play-circle-outline' size={82} color='white' />
      </Control>
      :
      <Control type='primary' onPress={() => TrackPlayer.pause()} style={styles.playPause}>
        <Ionicons name='ios-pause-circle-outline' size={82} color='white' />
      </Control>
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