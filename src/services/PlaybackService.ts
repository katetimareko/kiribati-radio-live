import TrackPlayer, { Event } from 'react-native-track-player';

export async function PlaybackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        console.debug('Event.RemotePause');
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        console.debug('Event.RemotePlay');
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        console.debug('Event.RemoteNext');
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        console.debug('Event.RemotePrevious');
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
        console.debug('Event.RemoteJumpForward', event);
        TrackPlayer.seekTo(event.interval);
    });

    TrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
        console.debug('Event.RemoteJumpBackward', event);
        TrackPlayer.seekTo(-event.interval);
    });

    TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
        console.debug('Event.RemoteSeek', event);
        TrackPlayer.seekTo(event.position);
    });

    TrackPlayer.addEventListener(
        Event.MetadataChapterReceived,
        async ({ metadata }) => {
            console.debug(metadata)
            const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
            if (currentTrackIndex) {
                const activeTrack = await TrackPlayer.getTrack(currentTrackIndex);
                const { title, artist } = metadata[currentTrackIndex]
                TrackPlayer.updateNowPlayingMetadata({
                    artist: [title, artist].filter(Boolean).join(' - '),
                    title: activeTrack?.title,
                    artwork: activeTrack?.artwork,
                });
            }
        }
    );
}