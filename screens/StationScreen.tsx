import Controls from "../components/Controls"
import GradientBackground from "../components/GradientBackground"
import {
    AdMobBanner
  } from 'expo-ads-admob';
import { Platform, StyleSheet, Text, View } from "react-native";
import * as Device from 'expo-device'

const testID = 'ca-app-pub-3940256099942544/6300978111';

const productionID = Platform.select({
    ios: "ca-app-pub-4159721019020027/6916039128",
   android: "ca-app-pub-4159721019020027/4566203802",
 });

// Is a real device and running in production.
const adUnitID = Device.isDevice && !__DEV__ ? productionID : testID;

export default function StationScreen() {
    return (
        <GradientBackground>
            <>
                <View style={styles.content}>
                <Controls />
                </View>
                <View style={styles.ad}>
                    <AdMobBanner
                    bannerSize="smartBannerLandscape"
                    adUnitID={adUnitID} // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={() => {
                        console.log('error')
                    }} />
                </View>
            </>
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    ad: {
        justifyContent: 'flex-end',
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }

})