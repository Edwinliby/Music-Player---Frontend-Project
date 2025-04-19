'use client'

import { useEffect, useRef, useState } from "react"
import Sidebar from "@/app/components/sidebar"
import MusicBar from "@/app/components/musicBar"
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import Profile from "@/app/components/Profile";
import FullPlayer from '@/app/components/FullPlayer';

function LayoutContent({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const musicBarRef = useRef(null);
  const [musicBarHeight, setMusicBarHeight] = useState(0);

  const {
    currentSong,
    isPlaying,
    handleTogglePlay,
    nextSong,
    prevSong,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    likedSongs,
    toggleLike,
  } = useMusicPlayer();

  useEffect(() => {
    if (musicBarRef.current) {
      setMusicBarHeight(musicBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] md:h-screen flex justify-end bg-cover bg-center bg-no-repeat">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Profile isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <FullPlayer />

      <div
        className={`relative z-10 h-full md:rounded-l-4xl transition-all duration-300 overflow-hidden
          ${isSidebarOpen ? "w-full md:w-[80%] xl:w-[85%]" : "w-full md:w-[93%] xl:w-[95%]"}`}
      >
        <img src="/bg.webp" alt="backkground" draggable={false} className="-z-10 absolute left-0 top-0 object-cover object-center w-full h-full" />
        <div className="h-full flex flex-col justify-between bg-white/90 backdrop-blur-[100px]">
          <div
            className="overflow-hidden"
            style={{ height: `calc(100% - ${musicBarHeight}px)` }}
          >
            {children}
          </div>
          <div ref={musicBarRef} className="z-50">
            <MusicBar
              song={currentSong}
              isPlaying={isPlaying}
              onNext={nextSong}
              onPrev={prevSong}
              onTogglePlay={handleTogglePlay}
              volume={volume}
              setVolume={setVolume}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              likedSongs={likedSongs}
              toggleLike={toggleLike}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutContent