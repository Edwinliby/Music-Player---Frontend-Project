'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { data } from './data'
import { motion, AnimatePresence } from 'framer-motion'

export default function Index() {
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
        <div className='relative w-full h-[88%] flex flex-col gap-4'>
            <div className='absolute w-full h-14 bg-gradient-to-t from-white to-transparent -bottom-3 left-0 z-50' />

            {/* Top Artists */}
            <div className='w-full'>
                <h2 className='text-xl font-semibold mb-2'>Top Artists</h2>
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
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 z-20 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 z-20 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <ChevronRight />
                    </button>

                    {/* Scrollable Artists */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className='w-full flex items-center horizontal-scroll py-2 pr-6 md:pr-8 overflow-x-auto scroll-smooth'
                    >
                        {data.map((item, index) => (
                            <motion.div
                                key={index}
                                className='group shrink-0 w-42 p-3 hover:bg-gray-200/50 active:bg-gray-200/50 rounded-md'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, rotate: 0.3 }}
                                onMouseEnter={() => {
                                    if (!isTouchDevice) setHoveredCard(index)
                                }}
                                onMouseLeave={() => {
                                    if (!isTouchDevice) setHoveredCard(null)
                                }}
                            >
                                <div className='relative rounded-lg overflow-hidden'>
                                    <img
                                        src={item.coverImg}
                                        alt={item.title}
                                        className='w-40 h-38 object-cover'
                                    />
                                    <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/70' />

                                    {(!isTouchDevice && hoveredCard === index) || isTouchDevice ? (
                                        <Play className='fill-white text-white absolute bottom-3 right-3 bg-green-500 rounded-full p-2 w-8 h-8 transition-opacity duration-300' />
                                    ) : null}
                                </div>
                                <p className='w-36 text-sm text-gray-500 pt-2 truncate'>
                                    This is {item.author}. The essential tracks, all in one playlist.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* You may also like */}
            <div className='custom-scrollbar'>
                <h2 className='text-xl font-semibold sticky -top-0.5 z-10 bg-white py-2 pb-4'>
                    You may also like
                </h2>
                <div className='grid md:grid-cols-2 gap-2 md:gap-4'>
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            className='flex items-center justify-between gap-2 p-2 rounded active:bg-gray-100 hover:bg-gray-100'
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: index * 0.06 }}
                        >
                            <div className='flex items-center gap-2'>
                                <img src={item.coverImg} alt={item.title} className='w-12 h-12 rounded object-cover' />
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>{item.title}</p>
                                    <p className='text-sm text-gray-500'>{item.author}</p>
                                </div>
                            </div>
                            <span className='text-sm'>{item.timestamp}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}