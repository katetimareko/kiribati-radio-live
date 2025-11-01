import { getApp } from "@react-native-firebase/app";
import { getMessaging } from "@react-native-firebase/messaging";

export const messaging = getMessaging(getApp())

