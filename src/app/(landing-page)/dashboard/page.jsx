'use client'

import { useState } from 'react';
import MusicBar from './_components/musicBar'
import { data } from '@/../public/artistData'
import NowPlaying from './_components/NowPlaying';
import SearchBar from '@/app/components/SearchBar';
import ArtistSection from './_components/ArtistSection';

export default function page() {
    const [songs] = useState(data);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const nextSong = (mode = 'normal') => {
        if (mode === 'shuffle') {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentIndex(randomIndex);
        } else {
            setCurrentIndex((prev) => (prev + 1) % songs.length);
            setIsPlaying(true);
        }
    };

    const prevSong = () => {
        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const handleTogglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    return (
        <div className="h-screen flex flex-col justify-between">
            <div className="overflow-hidden h-full px-4 md:px-6">
                <div className="h-full w-full flex justify-between gap-4">
                    <div className='w-full lg:w-[75%] flex flex-col'>
                        <SearchBar />
                        <ArtistSection />
                    </div>
                    <div className='hidden lg:block w-[14rem] xl:w-[25%] py-4'>
                        <NowPlaying song={songs[currentIndex]} isPlaying={isPlaying} />
                    </div>
                </div>
            </div>

            <MusicBar
                song={songs[currentIndex]}
                onNext={nextSong}
                onPrev={prevSong}
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
            />
        </div>
    )
}