'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { CirclePlus, Check, AudioLines } from 'lucide-react'
import Image from 'next/image'
import Box from '@/../public/box.webp'
import Tool from '@/../public/tool.webp'

export default function NowPlaying({ song, isPlaying }) {
    const [liked, setLiked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false)
    const rotate = useMotionValue(0);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(null);

    const FollowToggle = () => {
        setIsFollowing((prev) => !prev)
    }

    const spin = (time) => {
        if (lastTimeRef.current != null) {
            const delta = time - lastTimeRef.current;
            const current = rotate.get();
            rotate.set(current + (delta * 0.06));
        }
        lastTimeRef.current = time;
        animationRef.current = requestAnimationFrame(spin);
    };

    useEffect(() => {
        if (isPlaying) {
            animationRef.current = requestAnimationFrame(spin);
        } else {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
            lastTimeRef.current = null;
        }

        return () => cancelAnimationFrame(animationRef.current);
    }, [isPlaying]);

    const toggleLike = () => setLiked((prev) => !prev);

    const topRef = useRef(null);
    const [topHeight, setTopHeight] = useState(0);

    useEffect(() => {
        if (topRef.current) {
            setTopHeight(topRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (topRef.current) {
                setTopHeight(topRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className='hidden lg:block w-full h-full overflow-hidden shadow'
        >
            <div ref={topRef} className='h-fit'>
                <h2 className='flex items-center gap-2 px-4 pt-4 pb-1 font-semibold'>
                    <AudioLines /> Now Playing
                    <span className='flex items-center text-[.6rem] text-gray-500'>
                        (<span className='w-8 overflow-hidden'>
                            <p className='animate-(--animate-marquee) whitespace-nowrap'>{song.title}</p>
                        </span>)
                    </span>
                </h2>

                <div className='relative px-4 py-4'>
                    <Image src={Box} alt='box' draggable={false} className='w-full h-full' />
                    <motion.img
                        draggable={false}
                        src={Tool.src}
                        alt='tool'
                        className={`absolute top-8 right-8 xl:top-9 xl:right-9 2xl:top-10 2xl:right-10 w-[calc(100%-80%)] xl:w-[calc(100%-78%)] h-fit z-10`}
                        animate={isPlaying ? { rotate: 12 } : { rotate: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'calc(100% - 2rem) 3rem' }}
                    />

                    <div className='absolute top-8 left-8 lg:top-6 lg:left-6.5 xl:top-8 xl:left-8 2xl:top-9 2xl:left-9
                    h-[calc(100%-25%)] w-[calc(100%-37%)] rounded-full overflow-hidden border-2 border-gray-300
                    '>
                        <div className='absolute top-0 left-0 z-10 bg-black/30 w-full h-full'>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-gradient-to-br from-[#767977] via-[#c1c1c1] to-[#989898] w-14 h-14 border-8 border-gray-700'>
                                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-100 w-1.5 h-1.5' />
                            </div>
                        </div>
                        <motion.img
                            src={song.coverImg}
                            draggable={false}
                            alt='disk'
                            style={{ rotate }}
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </div>

            <div
                className="relative flex flex-col gap-2 pb-4 custom-scrollbar"
                style={{ height: `calc(100% - ${topHeight}px)` }}
            >
                <motion.div
                    className="relative flex flex-col items-center gap-2 md:gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <Image
                        src={song.artistImg}
                        alt={song.title}
                        width={500}
                        height={500}
                        className="w-full fit object-bottom object-cover bg-gray-300"
                    />
                    <div className='z-20 absolute bottom-2 right-2'>
                        <motion.button
                            aria-label='Like'
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={toggleLike}
                        >
                            {liked ? (
                                <Check className="bg-green-500 p-0.5 text-white rounded-full flex items-center justify-center" size={20} />
                            ) : (
                                <CirclePlus className="" size={20} />
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    className='pt-2 xl:pt-4 flex flex-col gap-4'
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        className='px-2 xl:px-4 flex flex-col gap-1 font-medium'
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <b>About the Artist</b>
                            <button
                                aria-label='Follow'
                                onClick={FollowToggle}
                                className={`text-xs px-4 py-1.5 rounded-full transition duration-200 ${isFollowing
                                    ? 'bg-green-500 text-white hover:bg-green-400'
                                    : 'bg-gray-600 text-white hover:bg-gray-500'
                                    }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        </div>
                        <p className='text-md pt-2'>{song.hear}</p>
                        <p className='text-sm text-gray-600'>Place - {song.location}</p>
                    </motion.div>

                    {song.subSongs?.length > 0 && (<hr className='border-gray-300' />)}

                    {
                        song.subSongs?.length > 0 && (
                            <div className='flex flex-col gap-2 px-1'>
                                <b className='px-2 xl:px-3 text-sm font-medium'>Other list</b>
                                {song.subSongs?.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center justify-between gap-2 xl:gap-4 active:bg-gray-200 hover:bg-gray-100 px-2 py-2 rounded"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <div className="flex items-center gap-2 2xl:gap-4">
                                            <Image
                                                src={item.coverImg}
                                                alt={item.title}
                                                width={100}
                                                height={100}
                                                className="w-10 h-10 xl:w-14 xl:h-14 object-cover rounded-md bg-gray-300"
                                            />
                                            <div className="flex flex-col gap-1">
                                                <b className="text-xs xl:text-sm font-medium">{item.title}</b>
                                                {
                                                    item.featuring ? (
                                                        <p className="text-[.7rem] xl:text-xs text-gray-500 pb-1">feat. {item.featuring}</p>
                                                    ) : (
                                                        <p className="text-[.7rem] xl:text-xs text-gray-500 pb-1">feat. {song.author}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <span className='text-xs text-gray-500'>{item.timestamp}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )
                    }
                </motion.div>
            </div>
        </motion.div>
    );
}