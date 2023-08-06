import { Platform } from "react-native";
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";

const AppOpenAdId = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_ANDROID_APP_OPEN_ID : process.env.EXPO_PUBLIC_IOS_APP_OPEN_ID
const adUnitId = __DEV__ ? TestIds.APP_OPEN : AppOpenAdId!;

export const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true
});