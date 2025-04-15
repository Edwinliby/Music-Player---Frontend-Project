'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import NowPlaying from '../../_components/NowPlaying';
import SearchBar from '@/app/components/SearchBar';
import Image from 'next/image';
import Logo from '@/../public/logo.webp';
import { Clock, Play } from 'lucide-react';

export default function ArtistPage() {
    const searchParams = useSearchParams();

    const author = searchParams.get('author');
    const title = searchParams.get('title');
    const coverImg = searchParams.get('coverImg');
    const hear = searchParams.get('hear');
    const subSongs = JSON.parse(searchParams.get('subSongs') || '[]');

    const {
        songs,
        currentIndex,
        currentSong,
        isPlaying,
        playPlaylist,
        setCurrentIndex,
        handleTogglePlay,
    } = useMusicPlayer();

    useEffect(() => {
        playPlaylist(subSongs, 0, false); // <- autoplay = false
    }, []);

    return (
        <div className="h-full w-full flex justify-between">
            <div className='w-full lg:w-[75%] flex flex-col'>
                <SearchBar className={'px-4 md:px-6'} />
                <div className='custom-scrollbar h-full'>
                    <div className='relative'>
                        <img src={coverImg} alt={title} className="w-full h-[18rem] object-cover" />
                        <div className='absolute bottom-0 left-0 w-full h-full bg-black/50' />
                        <div className='absolute bottom-8 inset-x-4 md:inset-x-8 text-white font-semibold'>
                            <p>Public Playlist</p>
                            <h1 className='font-bold text-5xl xl:text-[5rem] md:leading-14 xl:leading-26 py-2 xl:py-0'>This Is {author}</h1>
                            <p className='text-sm text-white/70'>The essential tracks from {author}.</p>
                            <div className='flex items-center flex-wrap gap-2 mt-2'>
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    width={30}
                                    height={30}
                                />
                                <p>Wave Player •</p>
                                <p className='text-sm text-white/70'> {hear} • {subSongs.length} songs</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col py-4 md:py-6'>
                        <div className='sticky top-0 text-gray-600 flex items-center py-2 border-b border-gray-200 px-4 md:px-6'>
                            <span className='w-8 text-left'>#</span>
                            <span className='flex-1 text-left'>Title</span>
                            <span className='hidden md:block flex-1 text-left'>Album</span>
                            <span className='hidden md:block flex-1 text-left'>Date added</span>
                            <span className='text-right'><Clock size={20} /></span>
                        </div>
                        {
                            songs.map((song, index) => (
                                <div
                                    key={index}
                                    className={`text-gray-600 flex items-center py-2 hover:bg-gray-100 px-4 md:px-6 cursor-pointer ${index === currentIndex ? 'bg-gray-100' : ''}`}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                    }}
                                >
                                    <span className='w-8 text-left'>
                                        {index === currentIndex ? (
                                            <Play size={20} className='fill-gray-500 text-gray-500 relative -left-1.5' />
                                        ) : (
                                            index + 1
                                        )}
                                    </span>
                                    <div className='flex-1 flex items-center gap-2'>
                                        <img src={song.coverImg} alt={song.title} className='w-12 h-12 rounded object-cover' />
                                        <div>
                                            <b>{song.title}</b>
                                            <p className='text-sm'>{author}</p>
                                        </div>
                                    </div>
                                    <span className='hidden md:block flex-1 text-sm'>{song.album}</span>
                                    <span className='hidden md:block flex-1 text-sm'>{song.date}</span>
                                    <span className='text-sm text-right'>{song.timestamp}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='hidden lg:block w-[14rem] xl:w-[25%]'>
                <NowPlaying song={currentSong} isPlaying={isPlaying} togglePlay={handleTogglePlay} />
            </div>
        </div>
    );
}
