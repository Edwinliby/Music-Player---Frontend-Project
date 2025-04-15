'use client';

import Image from 'next/image';
import {
    Pause,
    Play,
    SkipBack,
    SkipForward,
    Heart,
    Shuffle,
    Volume1,
    VolumeX,
} from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { motion } from 'framer-motion';

export default function MusicBar({ song, onNext, onPrev, isPlaying: isPlayingProp, onTogglePlay }) {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const isWaveformReady = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [liked, setLiked] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [playOnLoad, setPlayOnLoad] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleKeyDown = useCallback((e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (!song?.music || !waveformRef.current) return;
    
        let aborted = false;
    
        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#D9D9D9',
            progressColor: '#13CA35',
            height: 30,
            barWidth: 2,
            responsive: true,
            normalize: true,
            cursorColor: 'transparent',
        });
    
        wavesurferRef.current = ws;
    
        ws.on('play', () => setIsPlaying(true));
        ws.on('pause', () => setIsPlaying(false));
        ws.setVolume(isMuted ? 0 : volume);
    
        ws.on('ready', () => {
            if (aborted) return;
            isWaveformReady.current = true;
            setDuration(ws.getDuration());
            if (playOnLoad) {
                ws.play();
                setPlayOnLoad(false);
            }
        });
    
        ws.on('audioprocess', () => {
            if (aborted) return;
            setCurrentTime(ws.getCurrentTime());
        });
    
        ws.on('seek', () => {
            if (aborted) return;
            setCurrentTime(ws.getCurrentTime());
        });
    
        ws.on('finish', () => {
            if (aborted) return;
            if (shuffle) {
                onNext('shuffle');
            } else {
                onNext?.();
            }
            setPlayOnLoad(true);
        });
    
        try {
            ws.load(song.music);
        } catch (e) {
            console.error('Error loading song:', e);
        }
    
        return () => {
            aborted = true;
            isWaveformReady.current = false;
            ws.destroy();
        };
    }, [song?.music]);

    useEffect(() => {
        setLiked(false);
    }, [song]);

    useEffect(() => {
        if (wavesurferRef.current) {
            wavesurferRef.current.setVolume(isMuted ? 0 : volume);
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (!wavesurferRef.current) return;

        if (isWaveformReady.current) {
            wavesurferRef.current.playPause();
        } else {
            setPlayOnLoad(true);
        }

        onTogglePlay();
    };

    const toggleMute = () => setIsMuted((prev) => !prev);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0) setIsMuted(false);
    };

    const toggleLike = () => setLiked((prev) => !prev);

    const toggleShuffle = () => setShuffle((prev) => !prev);

    const handleNext = () => {
        setPlayOnLoad(true);
        onNext?.();
    };

    const handlePrev = () => {
        setPlayOnLoad(true);
        onPrev?.();
    };

    if (!song) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full px-4 py-3 md:px-6 md:py-4 bg-white shadow-[0_-10px_20px_-2px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4 md:gap-0 z-50"
        >
            {/* Song Info */}
            <div className="flex items-center gap-2 md:gap-4">
                <Image
                    src={song.coverImg}
                    alt={song.title}
                    width={100}
                    height={100}
                    className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-md bg-gray-300"
                />
                <div className="flex flex-col">
                    <b className="text-sm font-medium">{song.title}</b>
                    <p className="text-[.7rem] md:text-xs text-gray-500 pb-1">{song.author}</p>
                </div>
            </div>

            {/* Controls and Visualizer */}
            <div className="flex items-center gap-8 w-fit xl:w-full xl:max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <SkipBack size={20} onClick={handlePrev} className="cursor-pointer" />
                    <span
                        onClick={togglePlay}
                        className="flex items-center justify-center w-10 h-10 shadow-md rounded-full cursor-pointer bg-white"
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </span>
                    <SkipForward size={20} onClick={handleNext} className="cursor-pointer" />
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
            <div className="hidden md:flex items-center gap-4">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={toggleShuffle}
                    className={`cursor-pointer ${shuffle ? 'text-green-500' : 'text-gray-400'}`}
                >
                    <Shuffle size={20} />
                </motion.div>

                <motion.div
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={toggleLike}
                    className="cursor-pointer"
                >
                    {liked ? (
                        <Heart className="text-red-500 fill-red-500" size={20} />
                    ) : (
                        <Heart className="text-gray-400" size={20} />
                    )}
                </motion.div>

                <div className="flex items-center gap-2">
                    <span onClick={toggleMute} className="cursor-pointer">
                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume1 size={20} />}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="custom-slider w-18 cursor-pointer"
                    />
                </div>
            </div>
        </motion.div>
    );
}