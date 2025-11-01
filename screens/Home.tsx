import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StationScreen from "./StationScreen";
import { Platform, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import GradientBackground from "../components/GradientBackground";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignContent: 'center',
                            padding: 10,
                        }}
                    >
                        <MaterialCommunityIcons style={{ textAlign: 'center', color: isFocused ? '#c31432' : '#222' }} size={24} name="radio" />
                        <Text allowFontScaling={false} style={{ fontSize: 15, color: isFocused ? '#c31432' : '#222', textAlign: 'center' }}>
                            {label.toString()}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Home = () => {
    const BannerId = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_ANDROID_BANNER_ID : process.env.EXPO_PUBLIC_IOS_BANNER_ID

    return (
        <GradientBackground>
            <>
                <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{
                    headerTransparent: true,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    sceneStyle: {
                        backgroundColor: 'transparent'
                    }
                }}>
                    <Tab.Screen name="Tarawa Station" children={() => {
                        return <StationScreen index={0} />
                    }} />
                    <Tab.Screen name="Kiritimati Station" children={() => {
                        return <StationScreen index={1} />
                    }} />
                </Tab.Navigator>
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
    );
}

const styles = StyleSheet.create({
    ad: {
        justifyContent: 'flex-end'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default Home