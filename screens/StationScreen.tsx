import Controls from "../components/Controls"
import GradientBackground from "../components/GradientBackground"
import {
    AdMobBanner
  } from 'expo-ads-admob';
import { StyleSheet, Text, View } from "react-native";
import * as Device from 'expo-device'

const testID = 'ca-app-pub-3940256099942544/6300978111';
const productionID = 'ca-app-pub-9329512651648015/3782407896';
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