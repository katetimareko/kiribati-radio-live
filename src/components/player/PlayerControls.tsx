import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';

import { Control } from './Control';
import { PlaybackError } from './PlaybackError';
import { PlayPauseButton } from './PlayPauseButton';

const performSkipToNext = () => TrackPlayer.skipToNext();
const performSkipToPrevious = () => TrackPlayer.skipToPrevious();

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
];

export const PlayerControls: React.FC = () => {
    const [playerError, setPlayerError] = useState('')

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn('An error occured while playing the current track.');
            setPlayerError('Playback error')
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Control iconName='stop-circle-outline' size={42} onPress={performSkipToPrevious} type="secondary" />
                <PlayPauseButton />
                <Control iconName='reload-circle-outline' size={42} onPress={performSkipToNext} type="secondary" />
            </View>
            <PlaybackError
                error={ playerError ? playerError : undefined}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});