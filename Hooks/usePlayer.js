import React, { useState, useContext, useEffect } from 'react'
import { PlayerContext } from "./PlayerContext"
import TrackPlayer from 'react-native-track-player'

const usePlayer = () => {

    const [state, setState] = useContext(PlayerContext);
    const [trackDuration, setTrackDuration] = useState(false);
    const [trackPosition, setTrackPosition] = useState(false);
    const [trackChangedTo, setTrackChangedTo] = useState(false); // When one track ends and the next one starts playing

    TrackPlayer.addEventListener('playback-track-changed', async (data) => {
        // console.log(data);
        // const track = await TrackPlayer.getTrack(data.nextTrack);
        setTrackChangedTo(data.nextTrack);
    });

    useEffect(() => {
        initPlayer();
    }, []);

    initPlayer = async () => {
        TrackPlayer.setupPlayer().then(() => { });
    }

    async function addTracks(tracks) {
        await clearQueue();

        TrackPlayer.add([...tracks]).then(function() {
            TrackPlayer.play();
        });
    }

    async function clearQueue() {
        TrackPlayer.reset().then(() => { });
    }

    async function playTrack(index) {
        // const r = await TrackPlayer.getQueue();
        // console.log(r);
        TrackPlayer.skip(`${index}`)
        // Also set duration
        let duration = await TrackPlayer.getDuration();
        setTrackDuration(duration);
        // trackTrack
        calculatePercentagePlayed()
    }

    function calculatePercentagePlayed() {
        // setInterval(getPos, 1000)
    }

    async function getPos() {
        // const position = await TrackPlayer.getBufferedPosition()
        // console.log(position);
        // setTrackPosition(position)
    }

    return {
        addTracks: addTracks,
        playTrack: playTrack,
        trackDuration: trackDuration,
        trackChangedTo: trackChangedTo,
    }
}

export { usePlayer }
