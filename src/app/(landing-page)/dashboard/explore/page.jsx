'use client'

import { data } from '@/../public/artistData'
import { data as pod } from '@/../public/podcastData'
import SearchBar from "@/app/components/SearchBar"
import TopArtist from '../_components/ArtistSection/components/TopArtist'
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const catList = ["Made for you", "Trending", "New Releases", "Hollywood", "Discover", "Cricket Lover", "Music", "Podcasts", "Summer", "Malayalam", "Arabic", "Egyptian"]

export default function Page() {
    const scrollRef = useRef(null)
    const [showLeftFade, setShowLeftFade] = useState(false)
    const [showRightFade, setShowRightFade] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    // Check if touch device
    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
        }
        checkTouch()
    }, [])

    const scroll = (direction) => {
        const { current } = scrollRef
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }

    const handleScroll = () => {
        const { current } = scrollRef
        if (current) {
            const { scrollLeft, scrollWidth, clientWidth } = current
            setShowLeftFade(scrollLeft > 0)
            setShowRightFade(scrollLeft + clientWidth < scrollWidth)
        }
    }

    useEffect(() => {
        handleScroll()
    }, [])

    return (
        <div className="h-full flex flex-col justify-between px-4 md:px-6 pt-4 md:pt-0">
            <SearchBar />
            <div className="relative bottom-10 md:bottom-0 w-full h-[88%] overflow-hidden">
                <div className="custom-scrollbar h-full">

                    <div className='overflow-hidden flex flex-col'>
                        <div className='flex flex-col gap-2 py-6'>
                            <h2 className='font-semibold text-xl'>Top Categories</h2>
                            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 py-2'>
                                {
                                    catList.map((item, index) => {
                                        const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`

                                        return (
                                            <motion.div
                                                key={index}
                                                className="relative flex items-center justify-between rounded-lg px-4 py-12 cursor-pointer transition-shadow overflow-hidden"
                                                style={{ backgroundColor: randomColor }}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                whileHover={{ scale: 1.025 }}
                                                transition={{ duration: 0.35 }}
                                            >
                                                <span className="absolute left-4 top-4 text-sm md:text-base font-semibold text-gray-900">
                                                    {item}
                                                </span>
                                                <img src="/bg.webp" alt="dummy" draggable={false} className='rounded w-14 h-14 absolute bottom-4 -right-2 -rotate-12' />
                                            </motion.div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='w-full my-6'>
                            <h2 className='font-semibold text-xl flex item-center justify-between w-full'>
                                Discover Weekly
                                <a href="/dashboard/artist" className='text-sm text-gray-500 font-medium'>Show all</a>
                            </h2>
                            <div className="relative w-full group">
                                {/* Gradients */}
                                <AnimatePresence>
                                    {showRightFade && (
                                        <motion.div
                                            key="right-fade"
                                            className='pointer-events-none absolute -right-0.5 h-full w-14 bg-gradient-to-l from-white z-10'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        />
                                    )}
                                </AnimatePresence>
                                <AnimatePresence>
                                    {showLeftFade && (
                                        <motion.div
                                            key="left-fade"
                                            className='pointer-events-none absolute -left-0.5 h-full w-14 bg-gradient-to-r from-white z-10'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Scroll Buttons */}
                                {showLeftFade && (
                                    <button
                                        onClick={() => scroll('left')}
                                        className="absolute left-0 z-20 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <ChevronLeft />
                                    </button>
                                )}
                                {showRightFade && (
                                    <button
                                        onClick={() => scroll('right')}
                                        className="absolute right-0 z-20 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <ChevronRight />
                                    </button>
                                )}

                                {/* Scrollable Artists */}
                                <div
                                    ref={scrollRef}
                                    onScroll={handleScroll}
                                    className='w-full flex items-center horizontal-scroll py-2 pr-6 md:pr-8 overflow-x-auto scroll-smooth'
                                >
                                    {data.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className='group shrink-0 p-3 hover:bg-gray-200/50 active:bg-gray-200/50 rounded-md'
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            whileHover={{ scale: 1.02 }}
                                            onMouseEnter={() => {
                                                if (!isTouchDevice) setHoveredCard(index)
                                            }}
                                            onMouseLeave={() => {
                                                if (!isTouchDevice) setHoveredCard(null)
                                            }}
                                        >
                                            <div className='relative rounded-lg overflow-hidden mb-1'>
                                                <img
                                                    src={item.coverImg}
                                                    alt={item.title}
                                                    className='w-40 h-40 object-cover rounded'
                                                />
                                                {(!isTouchDevice && hoveredCard === index) || isTouchDevice ? (
                                                    <Play className='fill-black text-black absolute bottom-1 right-1 bg-green-500 rounded-full p-2 w-11 h-11 transition-opacity duration-300' />
                                                ) : null}
                                            </div>
                                            <b className='text-sm font-semibold text-gray-500'>{item.title}</b>
                                            <p className='text-xs font-medium'>{item.author}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <TopArtist data={data} />

                        <div className='flex flex-col gap-2 py-4 md:py-6'>
                            <h2 className='font-semibold text-xl flex item-center justify-between w-full'>
                                Popular Podcasts
                                <a href="/dashboard/podcasts" className='text-sm text-gray-500 font-medium'>Show all</a>
                            </h2>
                            <div className='grid md:grid-cols-2 gap-2 md:gap-4 py-2'>
                                {
                                    pod.map((item, index) => {
                                        return (
                                            <div key={index} className="relative flex items-center p-2 gap-4 cursor-pointer rounded-lg overflow-hidden hover:bg-gray-200 active-hover:bg-gray-200">
                                                <img src={item.artistImg} alt="dummy" draggable={false} className='rounded w-20 h-20' />
                                                <div className='flex flex-col'>
                                                    <p className='text-sm text-gray-500'>{item.author}</p>
                                                    <h3 className='text-sm md:text-xl font-semibold'>{item.title}</h3>
                                                    <p className='text-xs md:text-sm text-gray-500'>34 min</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}