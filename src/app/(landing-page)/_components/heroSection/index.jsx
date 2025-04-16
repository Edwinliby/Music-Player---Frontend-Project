'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import m1 from '@/../public/hero/m1.webp'
import m2 from '@/../public/hero/m2.webp'
import m3 from '@/../public/hero/m3.webp'
import m4 from '@/../public/hero/m4.webp'

const imgData = [m1, m2, m3, m4];

export default function HeroSection() {
    return (
        <div className='h-fit w-full flex flex-col justify-center items-center px-6 pt-32 pb-18 sm:py-32 gap-14'>
            <div className="max-w-4xl mx-auto text-center flex flex-col gap-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-black via-[#313131] to-[#666666]">
                    Music is the Short hand of Emotion
                </h1>
                <p className="md:text-lg text-gray-600">
                    Stream your favorite songs, discover new artists, and vibe nonstop — all in one place.
                </p>
                <div className="flex justify-center gap-2 md:gap-4 flex-wrap mt-2">
                    <a href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play" className="h-8 md:h-12 rounded-md md:rounded-xl" />
                    </a>
                    <a href="#">
                        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="App Store" className="h-8 md:h-12 rounded-md md:rounded-xl" />
                    </a>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-8">
                {
                    imgData.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative md:w-[12rem] xl:w-[15rem]  h-fit even:-translate-y-8 pt-8"
                        >
                            <Image src={img} alt={`Image ${index}`} className="w-full h-full object-cover" />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}
