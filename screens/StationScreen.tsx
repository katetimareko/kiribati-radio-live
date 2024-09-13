import GradientBackground from "../components/GradientBackground"
import { AppState, BackHandler, Linking, StyleSheet, View } from "react-native";
import { PlayerControls } from "../src/components/player/PlayerControls";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { TrackInfo } from "../src/components/player/TrackInfo";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, HiddenItem, OverflowMenu, overflowMenuPressHandlerPopupMenu } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../src/components/HeaderItem";
import { Ionicons } from "@expo/vector-icons";

const Header = () => (
    <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <OverflowMenu
            testID='moreOptionBtn'
            onPress={overflowMenuPressHandlerPopupMenu}
            style={{ marginHorizontal: 10 }}
            OverflowIcon={({ color }) => <Ionicons name="ellipsis-vertical" size={23} color='white' />}
        >
            <HiddenItem testID='exitBtn' title="Close App" onPress={() => {
                BackHandler.exitApp()
            }} />
        </OverflowMenu>
    </HeaderButtons>
)


const StationScreen: React.FC<{
    index: number;
}> = ({ index }) => {

    const navigation = useNavigation()
    const appState = useRef(AppState.currentState)


    useLayoutEffect(() => {
        navigation.setOptions({
            // in your app, extract the arrow function into a separate component
            // to avoid creating a new one every time
            headerRight: Header,
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

    return (
            <View style={styles.content}>
                <TrackInfo />
                <PlayerControls />
            </View>
    )
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
    }
})

export default StationScreen
