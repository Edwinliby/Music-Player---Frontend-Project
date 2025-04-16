'use client'

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function Artist({ data }) {
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
        <div className='w-full my-6'>
            <h2 className='text-xl font-semibold mb-2'>Popular artists</h2>
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
                            <Link href={item.link}>
                                <div className='relative rounded-lg overflow-hidden mb-1'>
                                    <img
                                        src={item.artistImg}
                                        alt={item.title}
                                        className='w-40 h-40 object-cover rounded-full'
                                    />
                                    {(!isTouchDevice && hoveredCard === index) || isTouchDevice ? (
                                        <Play className='fill-black text-black absolute bottom-1 right-1 bg-green-500 rounded-full p-2 w-11 h-11 transition-opacity duration-300' />
                                    ) : null}
                                </div>
                                <b className='text-sm font-semibold text-gray-500'>{item.author}</b>
                                <p className='text-xs font-medium'>Artist</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
