'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { useEffect, useRef, useState } from 'react';
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Heart,
    VolumeX,
    Volume1,
    Shuffle,
    Fullscreen,
    Repeat
} from 'lucide-react';
import { motion } from 'framer-motion';

const MusicBar = () => {
    const {
        currentSong,
        isPlaying, handleTogglePlay,
        nextSong, prevSong,
        volume, setVolume,
        isMuted, setIsMuted,
        likedSongs, toggleLike,
        isShuffle, toggleShuffle,
        setIsFullPlayerOpen,
        currentTime, duration,
        loopMode, toggleLoop,
        waveformContainer, initWaveSurfer,
        waveformRef
    } = useMusicPlayer();

    // const waveformRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
        if (waveformRef.current) {
            waveformContainer.current = waveformRef.current;
            initWaveSurfer(waveformRef.current);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 721)
        }

        handleResize() // set on initial render
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); // prevent scrolling
                handleTogglePlay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleTogglePlay]);

    if (!currentSong) return null;

    return (
        <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bottom-14 md:bottom-0 w-full px-4 py-3 md:px-6 md:py-4 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.25)] flex items-center justify-between gap-4 md:gap-0 z-50"
        >
            {/* Song Info */}
            <div className="flex items-center gap-2 md:gap-4 flex-2 md:flex-1">
                <div className='relative w-12 h-12 md:w-14 md:h-14 rounded-md cursor-pointer overflow-hidden group'>
                    <img
                        src={currentSong?.coverImg || "/bg.webp"}
                        alt={currentSong?.title || "Song Cover"}
                        className="w-full h-full object-cover bg-gray-300"
                    />
                    <span onClick={() => setIsFullPlayerOpen(true)} className='w-full h-full absolute top-0 left-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/40'>
                        <Fullscreen className="text-white" />
                    </span>
                </div>
                <div className="flex flex-col">
                    <b className="text-sm font-medium">
                        {isSmallScreen && currentSong.title.length > 10
                            ? currentSong.title.slice(0, 10) + '...'
                            : currentSong.title}
                    </b>
                    <p className="text-[.7rem] md:text-xs text-gray-500 pb-1">{currentSong.author}</p>
                </div>
            </div>

            {/* Controls and Visualizer */}
            <div className="flex items-center gap-8 w-fit xl:w-full xl:max-w-2xl mx-auto md:flex-2">
                <div className="flex items-center gap-4">
                    <SkipBack size={20} onClick={prevSong} className="cursor-pointer" />
                    <span
                        onClick={handleTogglePlay}
                        className="flex items-center justify-center w-10 h-10 shadow-md rounded-full cursor-pointer bg-white"
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </span>
                    <SkipForward size={20} onClick={nextSong} className="cursor-pointer" />
                </div>
                {/* Wave Surfer */}
                <div className="hidden xl:flex items-center w-full">
                    <span className="text-xs text-gray-600 min-w-[40px]">
                        {formatTime(currentTime)}
                    </span>
                    <div ref={waveformRef} className="flex-1 h-fit cursor-pointer" />
                    <span className="text-xs text-gray-600 min-w-[40px] text-right">
                        {formatTime(duration)}
                    </span>
                </div>
                {/* Mobile view progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 lg:hidden bg-gray-200">
                    <div
                        className="h-full bg-green-500 transition-all duration-200"
                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    />
                </div>
            </div>

            {/* Right Side: Shuffle, Like, Volume */}
            <div className="flex items-center justify-end gap-4 md:flex-1">
                {/* Shuffle */}
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    title="Toggle Shuffle" onClick={toggleShuffle}
                    className={`cursor-pointer ${isShuffle ? 'text-green-500' : 'text-gray-400'}`}
                >
                    <Shuffle size={20} />
                </motion.button>

                {/* Loop */}
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={toggleLoop}
                    className={`cursor-pointer hidden md:block ${loopMode ? 'text-green-500' : 'text-gray-400'}`}
                >
                    <Repeat size={20} />
                </motion.button>

                {/* Like */}
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    title="Toggle Like"
                    onClick={() => toggleLike(currentSong.title)}
                    className="cursor-pointer"
                >
                    {likedSongs.includes(currentSong.title) ? (
                        <Heart className="text-red-500 fill-red-500" size={20} />
                    ) : (
                        <Heart className="text-gray-400" size={20} />
                    )}
                </motion.div>

                {/* Volume */}
                <div className="hidden md:flex items-center gap-2">
                    <span onClick={() => setIsMuted(!isMuted)} className="cursor-pointer">
                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume1 size={20} />}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="custom-slider w-18 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default MusicBar;