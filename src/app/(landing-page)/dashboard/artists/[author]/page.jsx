'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchBar from '@/app/components/SearchBar'
import { Play, Clock } from 'lucide-react'
import { useMusicPlayer } from '@/context/MusicPlayerContext'
import NowPlaying from '../../_components/NowPlaying';

export default function ArtistPage() {
    const {
        currentIndex,
        currentSong,
        isPlaying,
        playPlaylist,
        setCurrentIndex,
        handleTogglePlay,
    } = useMusicPlayer();

    const searchParams = useSearchParams()
    const [artistData, setArtistData] = useState(null)

    useEffect(() => {
        const raw = searchParams.get('data')
        if (raw) {
            try {
                const parsed = JSON.parse(decodeURIComponent(raw))
                setArtistData(parsed)
                playPlaylist(parsed.subSongs)
            } catch (err) {
                console.error('Failed to parse artist data:', err)
            }
        }
    }, [searchParams])

    if (!artistData) return <div className='h-full w-full flex justify-center items-center'>Loading...</div>

    return (
        <div className="h-full w-full flex justify-between">
            <div className='w-full lg:w-[73%] xl:w-[78%] flex flex-col'>
                <SearchBar className={'px-4 md:px-6'} />
                <div className='custom-scrollbar h-full'>
                    <div className='relative'>
                        <img src={artistData.coverImg} alt={artistData.title} draggable={false} className="w-full h-[18rem] object-cover" />
                        <div className='absolute bottom-0 left-0 w-full h-full bg-black/50' />
                        <div className='absolute bottom-8 inset-x-4 md:inset-x-8 text-white font-semibold'>
                            <p>Public Playlist</p>
                            <h1 className='font-extrabold text-5xl xl:text-[5rem] md:leading-14 xl:leading-26 py-2 xl:py-0'>This Is {artistData.author}</h1>
                            <p className='text-sm text-white/70'>The essential tracks from {artistData.author}.</p>
                            <div className='flex items-center flex-wrap gap-2 mt-2'>
                                <img src="/logo.webp" alt="logo" draggable={false} className="w-8 h-8 object-cover" />
                                <p>Wave Player •</p>
                                <p className='text-sm text-white/70'> {artistData.hear} • {artistData.subSongs.length} songs</p>
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
                        <div className='custom-scrollbar h-[20rem] lg:h-fit pb-10 md:pb-4'>
                            {
                                artistData.subSongs.map((song, index) => (
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
                                                <p className='text-sm'>{artistData.author}</p>
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
            </div>
            <div className='hidden lg:block w-[27%] xl:w-[22%]'>
                <NowPlaying song={currentSong} isPlaying={isPlaying} togglePlay={handleTogglePlay} />
            </div>
        </div>
    );
}