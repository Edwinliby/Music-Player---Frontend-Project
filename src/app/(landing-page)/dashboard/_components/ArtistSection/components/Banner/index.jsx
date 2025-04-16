'use client'

import { useEffect, useState } from 'react'
import { data } from '@/../public/bannerData'
import { Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    const item = data[currentIndex]

    return (
        <div className='relative h-fit xl:h-[20rem] md:mr-4 pt-2 overflow-hidden'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="h-fit w-full rounded-4xl"
                    style={{
                        backgroundImage: `url(${item.bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className='relative z-20 flex flex-col lg:flex-row items-end justify-between gap-4 h-full text-center rounded-4xl bg-black/20 overflow-hidden lg:overflow-visible'>
                        <div className='flex flex-col h-full w-full lg:w-fit p-4 pt-6 xl:mb-8 md:pl-6 gap-4 text-left text-white'>
                            <p className='uppercase text-sm'>Curated Playlist</p>
                            <h2 className='text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl uppercase font-bold pt-2'>{item.title}</h2>
                            <p className='2xl:text-lg pb-2'>Enjoy the music with your loved ones and friends</p>
                            <div>
                                <p className='text-sm flex items-center flex-wrap font-semibold gap-2'>
                                    <Heart className='fill-white rounded-lg p-2 w-8 h-8 bg-gray-100/25' />{item.likes}
                                    <span className='text-white/60'>•</span>
                                    <span className='text-white/60'>{item.no}</span>
                                    <span className='text-white/60'>{item.time}</span>
                                </p>
                            </div>
                        </div>
                        <img
                            key={item.Img}
                            src={item.Img}
                            alt={item.title}
                            className='z-20 w-fit h-[19rem] relative rounded-br-4xl object-contain drop-shadow-lg'
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}