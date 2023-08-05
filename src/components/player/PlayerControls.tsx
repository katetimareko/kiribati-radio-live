import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';

import { Control } from './Control';
import { PlaybackError } from './PlaybackError';
import { PlayPauseButton } from './PlayPauseButton';
import { Ionicons } from '@expo/vector-icons';
import { SetupService } from '../../services/SetupService';
import { QueueInitialTracksService } from '../../services/QueueInitialTracksService';

const reload = async () => {
    await TrackPlayer.reset()
    await SetupService()
    await QueueInitialTracksService()
}

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
                <Control onPress={reload} type="secondary">
                <Ionicons name='stop-circle-outline' size={42} color='white' />
                </Control>
                <PlayPauseButton />
                <Control onPress={reload} type="secondary">
                    <Ionicons name='reload-circle-outline' size={42} color='white' />
                </Control>
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