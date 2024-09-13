import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';
import TrackPlayer, { usePlaybackState, State, useActiveTrack, Track } from 'react-native-track-player';
import { Control } from './Control';
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const interestialId = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_ANDROID_INTERSTITIAL_ID : process.env.EXPO_PUBLIC_IOS_INTERSTITIAL_ID;

export const PlayPauseButton: React.FC = () => {
  const { state } = usePlaybackState()
  const index = useNavigationState((state) => state.index);
  const [play, setPlay] = useState<boolean>(true)

  const { load, show, isClosed, isLoaded } = useInterstitialAd(__DEV__ ? TestIds.INTERSTITIAL : interestialId!, {
    requestNonPersonalizedAdsOnly: true
  })

  const bufferingDuringPlay = state === State.Buffering
  const connection = state === State.Loading
  const playing = state === State.Playing
  const paused = state === State.Paused
  const playerReady = state === State.Ready

  useEffect(() => {
    (async () => {
        var current = await TrackPlayer.getActiveTrackIndex()
        setPlay(current !== index)
    })();
}, [index]);

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (isClosed) {
      TrackPlayer.play()
      load()
    }
  }, [isClosed]);

  return bufferingDuringPlay || connection || !isLoaded ? (
    <View style={styles.statusContainer}>
      <ActivityIndicator size='large' color='white' />
    </View>
  ) : (
    !playing || play ?
      <Control type='primary' onPress={ async () => {
        var currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

        if (index !== currentTrackIndex) {
          TrackPlayer.pause()
          setPlay(false)
          await TrackPlayer.skipToNext()
        }
        if (isLoaded) {
          show()
          return
        }
        
        TrackPlayer.play()
      }} style={styles.playPause}>
        <Ionicons name='play-circle-outline' size={82} color='white' />
      </Control>
      :
      <Control type='primary' onPress={() => TrackPlayer.pause()} style={styles.playPause}>
        <Ionicons name='pause-circle-outline' size={82} color='white' />
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