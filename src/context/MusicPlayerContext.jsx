'use client';

import { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
import { data as songData } from '@/../public/artistData';
import { data as podData } from '@/../public/podcastData';

const MusicPlayerContext = createContext(null);

export const MusicPlayerProvider = ({ children }) => {
    const pathname = usePathname();

    // Check if the route is a podcast route
    const isPodcastRoute = pathname.includes('/dashboard/podcast');
    const initialData = isPodcastRoute ? podData : songData;

    // Ensure songs is always an array
    const [songs, setSongs] = useState(Array.isArray(initialData) ? initialData : []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Ensure currentIndex is within bounds of songs array
    const currentSong = songs.length > 0 ? songs[currentIndex] : null;

    const nextSong = (mode = 'normal') => {
        if (songs.length === 0) return; // Don't change song if no songs are available

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
        if (songs.length === 0) return; // Don't go to the previous song if no songs are available

        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const playPlaylist = (newSongs, index = 0, autoPlay = true) => {
        setSongs(Array.isArray(newSongs) ? newSongs : []);
        setCurrentIndex(index);
        setIsPlaying(autoPlay); // Only play if autoPlay is true
    };

    const handleTogglePlay = () => {
        setIsPlaying((prev) => !prev);
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
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);