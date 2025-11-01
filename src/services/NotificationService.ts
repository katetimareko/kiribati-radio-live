import { Platform } from "react-native";
import {AuthorizationStatus} from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import { messaging } from "../helper/firebase";

export const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
        const authStatus = await messaging.requestPermission();
        const _ =
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;
    } else {
        if (Platform.OS === 'android') {
            var granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            if (!granted) {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
                    title: 'Notification',
                    message:
                        'Accept notification permission if you want Kiribati Radio Live to notify you when radio is live',
                    buttonPositive: 'OK',
                },
                );
            }
        }
    }
}
