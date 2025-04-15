'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { CirclePlus, Check, AudioLines } from 'lucide-react'
import Image from 'next/image'
import Box from '@/../public/box.webp'
import Tool from '@/../public/tool.webp'
import Disk from '@/../public/disk.webp'

export default function NowPlaying({ song, isPlaying }) {
    const [liked, setLiked] = useState(false);
    const rotate = useMotionValue(0);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(null);

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
            className='hidden lg:block bg-[#fff] w-[14rem] xl:w-[25%] h-full rounded-2xl overflow-hidden shadow'
        >
            <div ref={topRef} className='h-fit'>
                <h2 className='flex items-center gap-2 px-4 pt-4 pb-1 font-semibold'>
                    <AudioLines /> Now Playing
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

                    <motion.img
                        src={Disk.src}
                        draggable={false}
                        alt='disk'
                        style={{ rotate }}
                        className='h-fit absolute top-8 left-8 lg:top-6 lg:left-6.5 xl:top-8 xl:left-8 2xl:top-9 2xl:left-9 lg:w-[calc(100%-38%)] xl:w-[calc(100%-35%)]'
                    />
                </div>
            </div>

            <div
                className="relative flex flex-col gap-2 pb-4 custom-scrollbar"
                style={{ height: `calc(100% - ${topHeight}px)` }}
            >
                <div className="absolute top-0 left-0 z-10 bg-gradient-to-t from-transparent to-[#fff] w-full h-1/2" />
                <motion.div
                    className="relative flex flex-col items-center gap-2 md:gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <Image
                        src={song.coverImg}
                        alt={song.title}
                        width={100}
                        height={100}
                        className="w-full h-32 xl:h-50 object-bottom object-cover bg-gray-300"
                    />
                    <div className="absolute top-0 left-0 z-10 bg-[#fff]/65 w-full h-full" />
                    <div className='z-20 absolute bottom-0 right-0 px-2 xl:px-4 py-1 xl:py-2 w-full h-fit flex items-center justify-between'>
                        <span>
                            <b className="font-semibold text-lg">{song.title}</b>
                            <p className="text-xs md:text-xs font-semibold text-gray-700 pb-1">{song.author}</p>
                        </span>
                        <motion.button
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
                        <b>About the Artist</b>
                        <p className='text-md pt-2'>{song.hear}</p>
                        <p className='text-sm text-gray-600'>{song.location}</p>
                    </motion.div>

                    {song.subSongs?.length > 0 && (<hr className='border-gray-300' />)}

                    {
                        song.subSongs?.length > 0 && (
                            <div className='flex flex-col gap-2 px-1'>
                                <b className='px-2 xl:px-3 text-sm font-medium'>Other Songs</b>
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
                                                    item.featuring && (
                                                        <p className="text-[.7rem] xl:text-xs text-gray-500 pb-1">feat. {item.featuring}</p>
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