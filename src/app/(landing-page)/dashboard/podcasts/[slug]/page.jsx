'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import NowPlaying from '../../_components/NowPlaying';
import SearchBar from '@/app/components/SearchBar';
import { Ellipsis, Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PodcastPage() {
    const [isFollowing, setIsFollowing] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const FollowToggle = () => {
        setIsFollowing((prev) => !prev)
    }

    const handleEllipsisClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleShareOption = (option) => {
        console.log(`Shared via ${option}`);
        setIsDropdownOpen(false); // Close dropdown after selecting option
    };

    const {
        currentSong,
        isPlaying,
        playPlaylist,
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
                <SearchBar />
                <div className='custom-scrollbar h-full'>
                    <motion.div
                        className='relative flex flex-wrap items-end gap-6 p-4 md:p-6 mt-4 md:mt-10'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <img
                            src={artistData.artistImg}
                            alt={artistData.title}
                            className="w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] rounded-xl shadow-2xl object-cover"
                        />
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Public Playlist</p>
                            <h1 className='font-extrabold text-5xl xl:text-6xl'>This Is {artistData.author}</h1>
                            <p className='text-xl font-semibold'>{artistData.author}</p>
                        </div>
                    </motion.div>

                    <div className='w-full h-full relative flex flex-col gap-6 md:gap-8 p-4 md:p-6'>
                        <div className='absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-black/5 to-transparent' />

                        <div className='flex items-center gap-6 z-10'>
                            <button
                                onClick={FollowToggle}
                                className={`border cursor-pointer px-6 py-1.5 rounded-full transition duration-200 ${isFollowing
                                    ? 'bg-green-500 border-green-500 text-white hover:bg-green-400'
                                    : 'border-gray-400 bg-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>

                            <div className="relative">
                                <button onClick={handleEllipsisClick}>
                                    <Ellipsis />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute mt-2 w-40 bg-black/50 text-white backdrop-blur-xl rounded-md shadow-lg z-20">
                                        <ul>
                                            <li
                                                onClick={() => handleShareOption('Facebook')}
                                                className="px-4 py-2 text-sm hover:bg-black/15 cursor-pointer"
                                            >
                                                Share on Facebook
                                            </li>
                                            <li
                                                onClick={() => handleShareOption('Twitter')}
                                                className="px-4 py-2 text-sm hover:bg-black/15 cursor-pointer"
                                            >
                                                Share on Twitter
                                            </li>
                                            <li
                                                onClick={() => handleShareOption('LinkedIn')}
                                                className="px-4 py-2 text-sm hover:bg-black/15 cursor-pointer"
                                            >
                                                Share on LinkedIn
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className='flex flex-col gap-3'>
                            <b className='text-2xl font-semibold'>About</b>
                            <p className='text-black/80'>{artistData.about}</p>
                            <div className='flex items-center gap-2'>
                                <button className='border cursor-pointer rounded-4xl px-2'>4.4</button> <Star size={20} /> <span className='text-black/60 text-sm'>(2.6K)</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 pb-18 md:pb-0'>
                            <b className='text-2xl font-semibold'>All Episodes</b>
                            <hr className='border border-black/10' />

                            {[1, 2, 3, 4].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                                    className='relative flex items-start gap-4 p-2 md:p-4 rounded-xl hover:bg-gray-100 active-hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                >
                                    <img
                                        src={artistData.artistImg}
                                        alt={artistData.title}
                                        className="w-[8rem] h-[8rem] rounded-xl shadow-lg object-cover"
                                    />
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='font-semibold text-sm md:text-xl'>How to unlock your brain's full potential using a piece of paper.</h2>
                                        <p className='font-medium text-xs md:text-base text-gray-500'>{artistData.author} • Podcast</p>
                                        <p className='font-medium text-sm text-gray-500'>16 April 2025</p>
                                    </div>
                                    <Play className='absolute bottom-4 right-4 w-6 h-6 fill-black' />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='hidden lg:block w-[27%] xl:w-[22%]'>
                <NowPlaying
                    song={currentSong}
                    isPlaying={isPlaying}
                    togglePlay={handleTogglePlay}
                />
            </div>
        </div>
    );
}
