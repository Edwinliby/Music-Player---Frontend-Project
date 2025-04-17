'use client'

import { useMusicPlayer } from '@/context/MusicPlayerContext'
import NowPlaying from './_components/NowPlaying';
import SearchBar from '@/app/components/SearchBar';
import ArtistSection from './_components/ArtistSection';

export default function Page() {
    const { currentSong, isPlaying } = useMusicPlayer();

    return (
        <div className="h-full w-full flex justify-between px-4 md:px-6">
            <div className='w-full lg:w-[75%] flex flex-col'>
                <SearchBar className={'pr-4'} />
                <ArtistSection />
            </div>
            <div className='hidden lg:block w-[14rem] xl:w-[25%]'>
                <NowPlaying song={currentSong} isPlaying={isPlaying} />
            </div>
        </div>
    );
}