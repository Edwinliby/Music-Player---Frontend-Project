'use client'

import React, { useState } from 'react';
import { Play, PlusCircle } from 'lucide-react';
import NowPlaying from '../_components/NowPlaying';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedPage() {
    const { currentSong, isPlaying } = useMusicPlayer();
    const [activeTab, setActiveTab] = useState('music');

    const musicData = [
        {
            id: 1,
            title: 'Blinding Lights',
            artists: 'The Weeknd',
            type: 'Single',
            timeAgo: '2 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&fit=crop&auto=format',
            imageText: 'BLINDING LIGHTS',
            imageTextBg: 'bg-red-500'
        },
        {
            id: 2,
            title: 'As It Was',
            artists: 'Harry Styles',
            type: 'Single',
            timeAgo: '2 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&fit=crop&auto=format',
            imageText: 'AS IT WAS',
            imageTextBg: 'bg-amber-500'
        },
        {
            id: 3,
            title: 'Dynamite',
            artists: 'BTS',
            type: 'Single',
            timeAgo: '3 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&fit=crop&auto=format',
            imageText: 'DYNAMITE',
            imageTextBg: 'bg-blue-500'
        },
        {
            id: 4,
            title: 'Bad Habits',
            artists: 'Ed Sheeran',
            type: 'Single',
            timeAgo: '4 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&fit=crop&auto=format',
            imageText: 'BAD HABITS',
            imageTextBg: 'bg-purple-500'
        }
    ];

    const podcastData = [
        {
            id: 1,
            title: 'The Joe Rogan Experience',
            creator: 'Joe Rogan',
            type: 'Talk Show',
            timeAgo: '1 day ago',
            imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400&fit=crop&auto=format',
            imageText: 'JRE',
            imageTextBg: 'bg-gray-500'
        },
        {
            id: 2,
            title: 'Armchair Expert',
            creator: 'Dax Shepard',
            type: 'Interview',
            timeAgo: '2 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1634148739177-775032f3feb1?q=80&w=400&fit=crop&auto=format',
            imageText: 'ARMCHAIR',
            imageTextBg: 'bg-green-500'
        },
        {
            id: 3,
            title: 'Radiolab',
            creator: 'WNYC Studios',
            type: 'Science',
            timeAgo: '3 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?q=80&w=400&fit=crop&auto=format',
            imageText: 'RADIOLAB',
            imageTextBg: 'bg-indigo-500'
        }
    ];

    const currentData = activeTab === 'music' ? musicData : podcastData;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3
            }
        }
    };

    const tabButtonVariants = {
        inactive: {
            backgroundColor: "#e5e7eb",
            color: "#000",
            scale: 1
        },
        active: {
            backgroundColor: "#000",
            color: "#fff",
            scale: 1.05
        },
        tap: {
            scale: 0.95
        }
    };

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="h-full w-full flex justify-between">
            <motion.div
                className='w-full lg:w-[73%] xl:w-[78%] flex flex-col'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="custom-scrollbar overflow-x-hidden p-4 md:p-6">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="mb-8 sm:mb-12"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            >
                                What's New
                            </motion.h1>
                            <motion.p
                                className="text-gray-600 text-sm sm:text-base"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                The latest releases from artists, podcasts and shows you follow.
                            </motion.p>

                            {/* Filter Buttons */}
                            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                                <motion.button
                                    aria-label='Music'
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition"
                                    variants={tabButtonVariants}
                                    animate={activeTab === 'music' ? 'active' : 'inactive'}
                                    whileTap="tap"
                                    onClick={() => setActiveTab('music')}
                                >
                                    Music
                                </motion.button>
                                <motion.button
                                    aria-label='Podcasts'
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition"
                                    variants={tabButtonVariants}
                                    animate={activeTab === 'podcasts' ? 'active' : 'inactive'}
                                    whileTap="tap"
                                    onClick={() => setActiveTab('podcasts')}
                                >
                                    Podcast & Shows
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* New Release Section */}
                        <motion.div
                            className='mb-8 md:mb-6'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <motion.h2
                                className="text-2xl md:text-3xl font-bold mb-4 md:mb-6"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                            >
                                New
                            </motion.h2>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                >
                                    {currentData.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            {/* Divider */}
                                            <motion.div
                                                className="border-b border-gray-200 mb-4"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                            />

                                            {/* Content Item */}
                                            <motion.div
                                                className="flex items-center justify-between py-4 hover:px-4 rounded-2xl"
                                                variants={itemVariants}
                                                whileHover="hover"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <motion.div
                                                        className="relative w-24 h-24 flex-shrink-0"
                                                        whileHover="hover"
                                                    >
                                                        <div className={`absolute inset-0 rounded overflow-hidden`}>
                                                            <motion.img
                                                                variants={imageVariants}
                                                                src={item.imageUrl || `/hero/h1.webp`}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <motion.div
                                                                className={`absolute bottom-0 w-full ${item.imageTextBg} py-1 text-center text-[.5rem] text-white`}
                                                                initial={{ y: 20, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                transition={{ delay: 0.2 + index * 0.05 }}
                                                            >
                                                                {item.imageText}
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                                                    >
                                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                                        <p className="text-gray-600">{activeTab === 'music' ? item.artists : item.creator}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-gray-600 text-sm">{activeTab === 'music' ? item.type : item.type}</span>
                                                            <span className="text-gray-600 mx-1">•</span>
                                                            <span className="text-gray-600 text-sm">{item.timeAgo}</span>
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <motion.button
                                                        aria-label='Add'
                                                        whileTap={{ scale: 0.8 }}
                                                        whileHover={{
                                                            scale: 1.2,
                                                            rotate: 90,
                                                            transition: { duration: 0.3 }
                                                        }}
                                                        className="text-gray-600 hover:text-black"
                                                    >
                                                        <PlusCircle size={24} />
                                                    </motion.button>
                                                    <motion.button
                                                        aria-label='Play'
                                                        whileTap={{ scale: 0.9 }}
                                                        whileHover={{
                                                            scale: 1.1,
                                                            boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                                                            transition: {
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10
                                                            }
                                                        }}
                                                        className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center"
                                                    >
                                                        <Play size={20} fill="white" />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        </React.Fragment>
                                    ))}
                                    <motion.div
                                        className="border-b border-gray-200 mt-4"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.5, delay: currentData.length * 0.05 }}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                className='hidden lg:block w-[27%] xl:w-[22%]'
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                <NowPlaying song={currentSong} isPlaying={isPlaying} />
            </motion.div>
        </div>
    );
}