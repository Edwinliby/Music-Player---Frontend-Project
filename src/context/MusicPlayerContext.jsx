'use client'

import { createContext, useContext, useState } from 'react';
import { data as songData } from '@/../public/artistData';

const MusicPlayerContext = createContext(null);

export const MusicPlayerProvider = ({ children }) => {
    const [songs, setSongs] = useState(songData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [shuffleMode, setShuffleMode] = useState(false);  // Shuffle Mode
    const [loopMode, setLoopMode] = useState(false);  // Loop Mode

    const nextSong = (mode = 'normal') => {
        if (mode === 'shuffle') {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentIndex(randomIndex);
        } else if (mode === 'loop') {
            setCurrentIndex((prev) => prev);  // Keeps the same song in loop
        } else {
            setCurrentIndex((prev) => (prev + 1) % songs.length);
        }
        setIsPlaying(true);
    };

    const prevSong = () => {
        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const playPlaylist = (newSongs, index = 0, autoPlay = true) => {
        setSongs(newSongs);
        setCurrentIndex(index);
        setIsPlaying(autoPlay); // <- only play if autoPlay is true
    };

    const handleTogglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                songs,
                currentSong: songs[currentIndex],
                currentIndex,
                isPlaying,
                nextSong,
                prevSong,
                handleTogglePlay,
                setCurrentIndex,
                setIsPlaying,
                playPlaylist,
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
