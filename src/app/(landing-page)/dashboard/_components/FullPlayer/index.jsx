'use client';

import Image from 'next/image';
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Heart,
  Shuffle,
  Repeat,
  Volume1,
  VolumeX,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { motion } from 'framer-motion';

export default function FullPlayer({
  song,
  toggleFullPlayer,
  onNext,
  onPrev,
  isPlayingProp,
  onTogglePlay,
}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const isWaveformReady = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [liked, setLiked] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false); // Shuffle mode state
  const [loopMode, setLoopMode] = useState(false); // Loop mode state
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
      if (shuffleMode) {
        onNext('shuffle');
      } else {
        onNext();
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

  const handleNext = () => {
    setPlayOnLoad(true);
    onNext?.(shuffleMode ? 'shuffle' : loopMode ? 'loop' : 'normal');
  };

  const handlePrev = () => {
    setPlayOnLoad(true);
    onPrev?.();
  };

  useEffect(() => {
    if (!wavesurferRef.current || !isWaveformReady.current) return;
    if (isPlayingProp) {
      wavesurferRef.current.play();
    } else {
      wavesurferRef.current.pause();
    }
  }, [isPlayingProp]);

  useEffect(() => {
    setIsPlaying(isPlayingProp);
  }, [isPlayingProp]);

  return (
    <div className="absolute z-[99] inset-0 w-full h-full bg-white p-6 flex flex-col justify-center items-center gap-8">
      <button onClick={toggleFullPlayer} className="absolute top-6 right-6 text-2xl">
        <X />
      </button>

      <div className="flex flex-col items-center gap-6">
        <Image
          src={song.coverImg}
          alt={song.title}
          width={300}
          height={300}
          className="rounded-lg object-cover shadow-lg"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold">{song.title}</h2>
          <p className="text-gray-600">{song.author}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 w-fit xl:w-full xl:max-w-2xl mx-auto">
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
        <div className="flex items-center gap-4">
          <SkipBack size={26} onClick={handlePrev} className="cursor-pointer" />
          <motion.span
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={togglePlay}
            className="flex items-center justify-center w-15 h-15 shadow-md rounded-full cursor-pointer bg-white"
          >
            {isPlaying ? <Pause size={35} /> : <Play size={35} />}
          </motion.span>
          <SkipForward size={26} onClick={handleNext} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Shuffle */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => setShuffleMode(!shuffleMode)}
          className={`cursor-pointer ${shuffleMode ? 'text-green-500' : 'text-gray-400'}`}
        >
          <Shuffle size={20} />
        </motion.button>

        {/* Loop */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => setLoopMode(!loopMode)}
          className={`cursor-pointer hidden md:block ${loopMode ? 'text-green-500' : 'text-gray-400'}`}
        >
          <Repeat size={20} />
        </motion.button>

        {/* Like */}
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

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2">
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

    </div>
  );
}
