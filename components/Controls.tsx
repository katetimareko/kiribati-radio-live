import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState, useEffect } from "react"
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import {
    AdMobInterstitial,
  } from 'expo-ads-admob';
import * as Device from 'expo-device'

const testID = 'ca-app-pub-3940256099942544/1033173712';
const productionID = 'ca-app-pub-4159721019020027/7246275834';
// Is a real device and running in production.
const adUnitID = Device.isDevice && !__DEV__ ? productionID : testID;

const url = 'http://streamer5.rightclickitservices.com:9790/stream'
export default function Controls() {

    const [sound, setSound] = useState<Audio.Sound>()
    const [isPlaying, setIsPlaying] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
        if (sound && sound._loaded)
            sound?.playAsync()
        
            AdMobInterstitial.setAdUnitID(adUnitID);
            AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
                console.log("interstitialDidLoad")
            )
            AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
                console.log("interstitialDidFailToLoad")
            )
            AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
                console.log("interstitialDidOpen")
            )
            AdMobInterstitial.addEventListener("interstitialDidClose", () =>
                console.log("interstitialDidClose")
            )
        
            return sound
          ? () => {
              console.log('Unloading Sound')
              setIsPlaying(false)
              sound.unloadAsync() 
              AdMobInterstitial.removeAllListeners();
            }

          : undefined
      }, [sound])

    async function onPlay() {
        var status = await sound?.getStatusAsync()

            setIsLoading(true)

        
        AdMobInterstitial.requestAdAsync().then(() => {
            AdMobInterstitial.showAdAsync()
        }).catch( _ => {
        })

        if (!sound) {
            await Audio.setAudioModeAsync({
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                staysActiveInBackground: true,
            })
            const { sound } = await Audio.Sound.createAsync({
                uri: url
            },{},onPlaybackStatusUpdate)

            sound.playAsync()
            setSound(sound)

            return
        }

        if (!sound._loaded) {
            await sound.loadAsync({
                uri: url
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
            }}/>
            <View style={styles.controls}>
                <Pressable onPress={onStop}>
                    <Ionicons style={{ paddingRight: 15}} name="stop-circle-outline" size={62} color="white" />
                </Pressable>
                {
                    isLoading ? 
                        <ActivityIndicator size={82} color="white" />
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
                    <Ionicons style={{ paddingLeft: 15}} name="reload-circle-outline" size={62} color="white" />
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