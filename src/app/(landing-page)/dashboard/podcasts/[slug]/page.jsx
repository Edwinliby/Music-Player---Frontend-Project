'use client';

import { useSearchParams } from 'next/navigation';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import NowPlaying from '../../_components/NowPlaying';
import SearchBar from '@/app/components/SearchBar';
import { Ellipsis, Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PodcastPage() {
    const searchParams = useSearchParams();

    const author = searchParams.get('author');
    const title = searchParams.get('title');
    const authorImg = searchParams.get('authorImg');
    const coverImg = searchParams.get('coverImg');
    const hear = searchParams.get('hear');
    const location = searchParams.get('location');
    const about = searchParams.get('about');
    const genre = searchParams.get('genre');

    const {
        songs,
        currentIndex,
        currentSong,
        isPlaying,
        setCurrentIndex,
        handleTogglePlay,
    } = useMusicPlayer();

    return (
        <div className="h-full w-full flex justify-between">
            <div className='w-full lg:w-[75%] flex flex-col'>
                <SearchBar className={'p-4 md:px-6'} />
                <div className='custom-scrollbar h-full'>
                    {/* Header Section */}
                    <motion.div
                        className='relative flex flex-wrap items-end gap-6 p-4 md:p-6 mt-4 md:mt-10'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <img
                            src={authorImg}
                            alt={title}
                            className="w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] rounded-xl shadow-2xl object-cover"
                        />
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Public Playlist</p>
                            <h1 className='font-bold text-5xl xl:text-6xl'>This Is {author}</h1>
                            <p className='text-xl font-semibold'>{author}</p>
                        </div>
                    </motion.div>

                    <div className='w-full h-full relative flex flex-col gap-6 md:gap-8 p-4 md:p-6'>
                        <div className='absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-black/5 to-transparent' />

                        <div className='flex items-center gap-6'>
                            <button className='border cursor-pointer rounded-4xl px-6 py-1.5'>Follow</button> <Ellipsis />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <b className='text-2xl font-semibold'>About</b>
                            <p className='text-black/80'>{about}</p>
                            <div className='flex items-center gap-2'>
                                <button className='border cursor-pointer rounded-4xl px-2'>4.4</button> <Star size={20} /> <span className='text-black/60 text-sm'>(2.6K)</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 pb-18 md:pb-0'>
                            <b className='text-2xl font-semibold'>All Episodes</b>
                            <hr className='border border-black/10' />

                            {/* Animated Episode Cards */}
                            {[1, 2, 3, 4].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                                    className='relative flex items-start gap-4 p-2 md:p-4 rounded-xl hover:bg-gray-100 active-hover:bg-gray-100'
                                >
                                    <img
                                        src={authorImg}
                                        alt={title}
                                        className="w-[8rem] h-[8rem] rounded-xl shadow-lg object-cover"
                                    />
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='font-semibold text-sm md:text-xl'>How to unlock your brain's full potential using a piece of paper.</h2>
                                        <p className='font-medium text-xs md:text-base text-gray-500'>{author} • Podcast</p>
                                        <p className='font-medium text-sm text-gray-500'>16 April 2025</p>
                                    </div>
                                    <Play className='absolute bottom-4 right-4 w-6 h-6 fill-black' />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='hidden lg:block w-[14rem] xl:w-[25%]'>
                <NowPlaying
                    song={currentSong}
                    isPlaying={isPlaying}
                    togglePlay={handleTogglePlay}
                />
            </div>
        </div>
    );
}
