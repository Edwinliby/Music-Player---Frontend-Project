'use client'

import { useState } from 'react';
import MusicBar from './_components/musicBar'
import { data } from '@/../public/data'
import NowPlaying from './_components/NowPlaying';

export default function page() {
    const [songs, setSongs] = useState(data);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSong = (mode = 'normal') => {
        if (mode === 'shuffle') {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentIndex(randomIndex);
        } else {
            setCurrentIndex((prev) => (prev + 1) % songs.length);
        }
    };

    const prevSong = () => {
        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    };

    return (
        <div className='relative h-full flex flex-col'>
            {/* <div className='flex justify-end gap-2 px-6 py-4 h-full'>
                <NowPlaying />
            </div> */}

            <MusicBar
                song={songs[currentIndex]}
                onNext={nextSong}
                onPrev={prevSong}
            />
        </div>
    )
}
