'use client'

import { createContext, useContext, useState } from 'react';
import { data as songData } from '@/../public/artistData';

const MusicPlayerContext = createContext(null);

export const MusicPlayerProvider = ({ children }) => {
    const [songs] = useState(songData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const nextSong = (mode = 'normal') => {
        if (mode === 'shuffle') {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentIndex(randomIndex);
        } else {
            setCurrentIndex((prev) => (prev + 1) % songs.length);
        }
        setIsPlaying(true);
    };

    const prevSong = () => {
        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
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
                setIsPlaying
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
