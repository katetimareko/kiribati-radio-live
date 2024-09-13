import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { Track, ResourceObject } from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';

export const TrackInfo = () => {

    const index = useNavigationState((state) => state.index);
    const [track, setTrack] = useState<Track>();

    useEffect(() => {
        (async () => {
            var track = await TrackPlayer.getTrack(index)
            setTrack(track!)
        })();
    }, [index]);


    if (!track) {
        return null
    }
    const artwork = track.artwork as ResourceObject
    return (
        <View style={styles.container}>
            <Image style={styles.artwork} source={artwork} />
            <Text style={styles.titleText}>{track?.title}</Text>
            <Text style={styles.artistText}>{track?.artist}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    artwork: {
        width: 240,
        height: 240,
        marginTop: 30,
        backgroundColor: 'grey',
    },
    titleText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginTop: 30,
    },
    artistText: {
        fontSize: 16,
        fontWeight: '200',
        color: 'white',
    },
});