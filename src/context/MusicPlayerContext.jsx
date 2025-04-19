'use client';

import { createContext, useContext, useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { data as songData } from '@/../public/artistData';
import { data as podData } from '@/../public/podcastData';
import WaveSurfer from 'wavesurfer.js';

const MusicPlayerContext = createContext(null);

export const MusicPlayerProvider = ({ children }) => {
    const pathname = usePathname();

    const isPodcastRoute = pathname.includes('/dashboard/podcast/');
    const initialData = isPodcastRoute ? podData : songData;

    const [songs, setSongs] = useState(Array.isArray(initialData) ? initialData : []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [likedSongs, setLikedSongs] = useState([]);
    const [isShuffle, setIsShuffle] = useState(false);
    const [loopMode, setLoopMode] = useState(false);
    const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const wavesurfer = useRef(null);
    const waveformContainer = useRef(null); // for UI to pass in
    const loopModeRef = useRef(loopMode);
    const shouldAutoPlayRef = useRef(false);
    const waveformRef = useRef(null);

    const currentSong = songs.length > 0 ? songs[currentIndex] : null;

    const initWaveSurfer = () => {
        if (wavesurfer.current || !waveformContainer.current) return; // Skip if already initialized or container is not ready

        wavesurfer.current = WaveSurfer.create({
            container: waveformContainer.current,
            waveColor: '#D9D9D9',
            progressColor: '#13CA35',
            height: 30,
            barWidth: 2,
            responsive: true,
            normalize: true,
            cursorColor: 'transparent',
        });

        wavesurfer.current.on('ready', () => {
            setDuration(wavesurfer.current.getDuration());
            wavesurfer.current.setVolume(isMuted ? 0 : volume);

            if (shouldAutoPlayRef.current) {
                wavesurfer.current.play();
                setIsPlaying(true);
                shouldAutoPlayRef.current = false;
            } else {
                setIsPlaying(false); // Pause by default if not auto-playing
            }
        });

        wavesurfer.current.on('audioprocess', () => {
            setCurrentTime(wavesurfer.current.getCurrentTime());
        });

        wavesurfer.current.on('seek', () => {
            setCurrentTime(wavesurfer.current.getCurrentTime());
        });

        wavesurfer.current.on('finish', () => {
            if (loopModeRef.current) {
                wavesurfer.current.seekTo(0);
                wavesurfer.current.play();
            } else {
                setCurrentTime(0);
                nextSong();
            }
        });
    };

    const loadCurrentSong = () => {
        if (wavesurfer.current && currentSong?.music) {
            wavesurfer.current.load(currentSong.music);
        }
    };

    useEffect(() => {
        if (isFullPlayerOpen) {
            initWaveSurfer();
        }
    }, [isFullPlayerOpen]); // Reinitialize when the player is opened

    useEffect(() => {
        loadCurrentSong();
    }, [currentSong]);

    useEffect(() => {
        if (wavesurfer.current) {
            isPlaying ? wavesurfer.current.play() : wavesurfer.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (wavesurfer.current) {
            wavesurfer.current.setVolume(isMuted ? 0 : volume);
        }
    }, [volume, isMuted]);

    const toggleShuffle = () => {
        setIsShuffle((prev) => !prev);
    };

    const toggleLoop = () => {
        setLoopMode((prev) => !prev);
    };

    const nextSong = () => {
        if (songs.length === 0) return;

        if (isShuffle) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentIndex && songs.length > 1);
            setCurrentIndex(randomIndex);
        } else {
            setCurrentIndex((prev) => (prev + 1) % songs.length);
        }

        shouldAutoPlayRef.current = true;
    };

    const prevSong = () => {
        if (songs.length === 0) return;

        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        shouldAutoPlayRef.current = true;
    };

    const playPlaylist = (newSongs, index = 0, autoPlay = false) => {
        setSongs(Array.isArray(newSongs) ? newSongs : []);
        setCurrentIndex(index);
        shouldAutoPlayRef.current = autoPlay;
    };

    const handleTogglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const toggleLike = (songId) => {
        setLikedSongs((prev) =>
            prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
        );
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                songs,
                currentSong,
                currentIndex,
                isPlaying,
                nextSong,
                prevSong,
                handleTogglePlay,
                setCurrentIndex,
                setIsPlaying,
                playPlaylist,
                volume,
                setVolume,
                isMuted,
                setIsMuted,
                likedSongs,
                toggleLike,
                loopMode,
                setLoopMode,
                toggleLoop,
                isShuffle,
                toggleShuffle,
                isFullPlayerOpen,
                setIsFullPlayerOpen,
                currentTime,
                setCurrentTime,
                duration,
                setDuration,
                waveformContainer,
                initWaveSurfer,
                waveformRef
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);