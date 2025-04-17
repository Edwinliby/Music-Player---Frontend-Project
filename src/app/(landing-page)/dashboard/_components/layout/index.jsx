'use client'

import { useEffect, useRef, useState } from "react"
import Sidebar from "@/app/components/sidebar"
import MusicBar from "@/app/components/musicBar"
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import Profile from "@/app/components/Profile";

function LayoutContent({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const musicBarRef = useRef(null);
  const [musicBarHeight, setMusicBarHeight] = useState(0);

  const {
    currentSong,
    isPlaying,
    nextSong,
    prevSong,
    handleTogglePlay,
  } = useMusicPlayer();

  useEffect(() => {
    if (musicBarRef.current) {
      setMusicBarHeight(musicBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-screen flex justify-end bg-[url(/bg.webp)] bg-cover bg-center bg-no-repeat">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Profile isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`relative z-10 h-full bg-white md:rounded-l-4xl transition-all duration-300 overflow-hidden
          ${isSidebarOpen ? "w-full md:w-[80%] xl:w-[85%]" : "w-full md:w-[93%] xl:w-[95%]"}`}
      >
        <div className="h-full flex flex-col justify-between">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutContent