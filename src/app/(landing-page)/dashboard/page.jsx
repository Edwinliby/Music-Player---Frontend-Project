'use client'

import { useMusicPlayer } from '@/context/MusicPlayerContext'
import NowPlaying from './_components/NowPlaying';
import SearchBar from '@/app/components/SearchBar';
import ArtistSection from './_components/ArtistSection';

export default function Page() {
    const { currentSong, isPlaying } = useMusicPlayer();

    return (
        <div className="h-full w-full flex justify-between">
            <div className='w-full lg:w-[73%] xl:w-[78%] flex flex-col'>
                <SearchBar />
                <ArtistSection />
            </div>
            <div className='hidden lg:block w-[27%] xl:w-[22%]'>
                <NowPlaying song={currentSong} isPlaying={isPlaying} />
            </div>
        </div>
    );
}