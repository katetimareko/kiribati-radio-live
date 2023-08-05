import GradientBackground from "../components/GradientBackground"
import { ActivityIndicator, BackHandler, Linking, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { PlayerControls } from "../src/components/player/PlayerControls";
import { useEffect, useLayoutEffect, useState } from "react";
import TrackPlayer, { Track } from "react-native-track-player";
import { TrackInfo } from "../src/components/player/TrackInfo";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, HiddenItem, OverflowMenu, overflowMenuPressHandlerPopupMenu } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../src/components/HeaderItem";
import { Ionicons } from "@expo/vector-icons";

const Header = () => (
    <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <OverflowMenu
        testID='moreOptionBtn'
        onPress={ overflowMenuPressHandlerPopupMenu}
        style={{ marginHorizontal: 10 }}
        OverflowIcon={({ color }) => <Ionicons name="ellipsis-vertical" size={23} color='white' />}
      >
        <HiddenItem testID='exitBtn' title="Close App" onPress={() => {
          BackHandler.exitApp()
        }} />
      </OverflowMenu>
    </HeaderButtons>
)

export default function StationScreen() {

    const BannerId = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_ANDROID_BANNER_ID : process.env.EXPO_PUBLIC_IOS_BANNER_ID
    const track = useSetupTrack()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            // in your app, extract the arrow function into a separate component
            // to avoid creating a new one every time
            headerRight: Header
        })
    }, [navigation])

    useEffect(() => {
        function deepLinkHandler(data: { url: string }) {
            console.log('deepLinkHandler', data.url);
        }

        // This event will be fired when the app is already open and the notification is clicked
        const subscription = Linking.addEventListener('url', deepLinkHandler);

        // When you launch the closed app from the notification or any other link
        Linking.getInitialURL().then((url) => console.log('getInitialURL', url));

        return () => {
            subscription.remove();
        };
    }, []);

    if (track === undefined) {
        return (
            <SafeAreaView style={styles.screenContainer}>
                <ActivityIndicator />
            </SafeAreaView>
        );
    }

    return (
        <GradientBackground>
            <>
                <View style={styles.content}>
                    <TrackInfo track={track!} />
                    <PlayerControls />
                </View>
                <View style={styles.ad}>
                    <BannerAd
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        unitId={__DEV__ ? TestIds.BANNER : BannerId!}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true
                        }}
                    />
                </View>
            </>
        </GradientBackground>
    )
}

function useSetupTrack() {
    const [track, setTrack] = useState<Track>();

    useEffect(() => {
        let unmounted = false;
        (async () => {
            if (unmounted) return;
            const trackIndex = await TrackPlayer.getCurrentTrack()
            const currentTrack = await TrackPlayer.getTrack(trackIndex!)
            setTrack(currentTrack!)
            if (unmounted) return;
        })();
        return () => {
            unmounted = true;
        };
    }, []);
    return track;
}

const styles = StyleSheet.create({
    ad: {
        justifyContent: 'flex-end'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    screenContainer: {
        flex: 1,
        backgroundColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center',
      },
    

})
