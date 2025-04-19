'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { useEffect, useRef, useState } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Heart,
  Volume1, VolumeX, Shuffle, X, Repeat
} from 'lucide-react';
import { motion } from 'framer-motion';
import ColorThief from 'colorthief';

const FullPlayer = () => {
  const {
    currentSong,
    isPlaying, handleTogglePlay,
    nextSong, prevSong,
    volume, setVolume,
    isMuted, setIsMuted,
    likedSongs, toggleLike,
    isShuffle, toggleShuffle,
    isFullPlayerOpen, setIsFullPlayerOpen,
    currentTime, duration,
    loopMode, toggleLoop,
    waveformContainer, initWaveSurfer
  } = useMusicPlayer();

  const waveformRef = useRef(null);
  const [bgGradient, setBgGradient] = useState('');

  useEffect(() => {
    if (!currentSong?.coverImg) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentSong.coverImg;

    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);

      // Slightly brighten each RGB component
      const brighten = (value, factor = 1.2) =>
        Math.min(Math.floor(value * factor), 255);

      const br = brighten(r);
      const bg = brighten(g);
      const bb = brighten(b);

      const base = `rgb(${br}, ${bg}, ${bb})`;
      const middle = `rgba(${br}, ${bg}, ${bb},.8)`;
      const soft = `rgba(${br}, ${bg}, ${bb},.9)`;

      setBgGradient(`radial-gradient(circle at 50% 20%, ${base}, ${middle}, ${soft})`);
    };
  }, [currentSong]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (isFullPlayerOpen) {
      waveformContainer.current && waveformContainer.current.scrollIntoView();
    }
  }, [isFullPlayerOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlay]);

  if (!isFullPlayerOpen || !currentSong) return null;

  return (
    <div
      style={{ background: bgGradient, }}
      className="fixed inset-0 backdrop-blur-3xl text-white z-[9999] p-6 flex flex-col gap-16 items-center justify-center transition-all duration-700 setBgGradient('radial-gradient(circle at center, #2e2e2e, #1a1a1a)');"
    >
      <div className='absolute left-0 top-0 w-full h-full bg-black/50 -z-10' />
      <button
        onClick={() => setIsFullPlayerOpen(false)}
        className="absolute top-4 right-4 text-white hover:text-gray-500"
      >
        <X size={28} />
      </button>

      <div className="flex flex-col items-center text-center">
        <div className='w-60 h-60 rounded-xl shadow-lg overflow-hidden'>
          <img src={currentSong.coverImg} alt={currentSong.title} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold mt-4">{currentSong.title}</h1>
        <p className="text-lg text-gray-400">{currentSong.author}</p>
      </div>

      {/* Waveform */}
      <div className="flex flex-col-reverse items-center gap-8 w-full h-fit xl:w-full xl:max-w-2xl mx-auto">
        <div className="flex items-center gap-6">
          <SkipBack onClick={prevSong} className="cursor-pointer" />
          <span
            onClick={handleTogglePlay}
            className="flex items-center justify-center w-16 h-16 shadow-md rounded-full cursor-pointer text-black bg-white"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </span>
          <SkipForward onClick={nextSong} className="cursor-pointer" />
        </div>
        {/* Wave Surfer */}
        <div className="flex items-center w-full text-white">
          <span className="text-xs min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <div ref={waveformRef} className="flex-1 h-16 cursor-pointer" />
          <span className="text-xs min-w-[40px] text-right">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end gap-4">
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
          className={`cursor-pointer ${loopMode ? 'text-green-500' : 'text-gray-400'}`}
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
        <div className="flex items-center gap-2">
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
            className="custom-slider cursor-pointer"
          />
        </div>
      </div>

    </div>
  );
};

export default FullPlayer;