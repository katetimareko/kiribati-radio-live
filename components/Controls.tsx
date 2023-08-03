import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator, Platform } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState, useEffect } from "react"
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import {
    TestIds, useInterstitialAd,
} from 'react-native-google-mobile-ads';
import * as Device from 'expo-device'

const url = process.env.EXPO_PUBLIC_URL
console.log(url)
export default function Controls() {

    const [sound, setSound] = useState<Audio.Sound>()
    const [isPlaying, setIsPlaying] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const interestialId = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_ANDROID_INTERSTITIAL_ID : process.env.EXPO_PUBLIC_IOS_INTERSTITIAL_ID
    const { load, show, isClosed, isLoaded } = useInterstitialAd(__DEV__ ? TestIds.INTERSTITIAL : interestialId!)

    async function onPlaybackStatusUpdate(playbackStatus: AVPlaybackStatus) {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state
            if (playbackStatus.isPlaying) {

                // Update your UI for the playing state
                setIsPlaying(true)
                setIsLoading(false)
            } else {
                // Update your UI for the paused state
                setIsPlaying(false)
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
            }

        }
    }

    useEffect(() => {
        load()
    }, [load])

    useEffect(() => {
        if (isClosed) {
          load()
        }
    }, [isClosed]);

    useEffect(() => {
        if (sound && sound._loaded)
            sound?.playAsync()

        return sound
            ? () => {
                console.log('Unloading Sound')
                setIsPlaying(false)
                sound.unloadAsync()
            }

            : undefined
    }, [sound])

    async function onPlay() {
        var status = await sound?.getStatusAsync()

        setIsLoading(true)


        show()

        if (!sound) {
            await Audio.setAudioModeAsync({
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                staysActiveInBackground: Platform.OS === 'android' ? true : false,
            })
            const { sound } = await Audio.Sound.createAsync({
                uri: url!
            }, {}, onPlaybackStatusUpdate)

            sound.playAsync()
            setSound(sound)

            return
        }

        if (!sound._loaded) {
            await sound.loadAsync({
                uri: url!
            })
        }
        sound.playAsync()

    }

    async function onPause() {
        await sound?.pauseAsync()
    }

    async function onStop() {
        await sound?.stopAsync()
    }

    async function onReload() {
        setIsPlaying(false)
        await sound?.unloadAsync()
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>AM Radio</Text>
            <Image resizeMode='stretch' source={{
                uri: 'https://www.worldatlas.com/webimage/flags/countrys/zzzflags/kilarge.gif',
                width: 200,
                height: 150,
            }} />
            <View style={styles.controls}>
                <Pressable onPress={onStop}>
                    <Ionicons style={{ paddingRight: 15 }} name="stop-circle-outline" size={62} color="white" />
                </Pressable>
                {
                    isLoading ?
                        <ActivityIndicator size={Platform.OS === 'android' ? 82 : "large"} color="white" />
                        :
                        !isPlaying ?
                            <Pressable onPress={onPlay}>
                                <Ionicons name="play-circle-outline" size={82} color="white" />
                            </Pressable>
                            :
                            <Pressable onPress={onPause}>
                                <Ionicons name="ios-pause-circle-outline" size={82} color="white" />
                            </Pressable>
                }
                <Pressable onPress={onReload}>
                    <Ionicons style={{ paddingLeft: 15 }} name="reload-circle-outline" size={62} color="white" />
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    controls: {
        paddingTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
        color: 'white'
    }
})