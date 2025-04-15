'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { data } from '@/../public/artistData'
import SearchBar from "@/app/components/SearchBar"
import { FastAverageColor } from 'fast-average-color'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react';

export default function Page() {
  const [colors, setColors] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const processedImages = useRef(new Set())

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
  }, [])

  const handleImageLoad = async (img, index) => {
    if (processedImages.current.has(index)) return
    processedImages.current.add(index)

    const fac = new FastAverageColor()
    try {
      const color = await fac.getColorAsync(img)
      setColors(prev => ({ ...prev, [index]: color.rgba }))
    } catch (err) {
      console.error('Color extraction failed:', err)
    }
  }

  return (
    <div className="h-screen flex flex-col justify-between px-4 md:px-6 pt-4 md:pt-0">
      <SearchBar />
      <div className="relative bottom-10 md:bottom-0 w-full h-[88%] overflow-hidden">
        <div className="custom-scrollbar h-full">
          <div className='overflow-hidden'>
            <h2 className="text-2xl font-semibold py-4">
              Best of artists
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4 mb-6">
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => {
                    if (!isTouchDevice) setHoveredCard(index)
                  }}
                  onMouseLeave={() => {
                    if (!isTouchDevice) setHoveredCard(null)
                  }}
                >
                  <Link
                    href={{
                      pathname: `/dashboard/artists/${item.author.toLowerCase().replace(/\s+/g, '-')}`,
                      query: {
                        title: item.title,
                        author: item.author,
                        artistImg: item.artistImg,
                        coverImg: item.coverImg,
                        music: item.music,
                        location: item.location,
                        hear: item.hear,
                        subSongs: JSON.stringify(item.subSongs),
                      },
                    }}
                    className="flex flex-col justify-center items-center gap-2 group transition-all duration-300"
                    style={{
                      ['--glow-color']: colors[index] || 'transparent'
                    }}
                  >
                    <div className='relative'>
                      <img
                        src={item.artistImg}
                        alt={item.title}
                        draggable="false"
                        crossOrigin="anonymous"
                        ref={(img) => {
                          if (img) handleImageLoad(img, index)
                        }}
                        className="w-[18rem] h-fit rounded-lg object-cover transition-shadow duration-500 group-hover:shadow-[0_0_25px_0px_var(--glow-color)]"
                      />
                      {(!isTouchDevice && hoveredCard === index) || isTouchDevice ? (
                        <Play className='fill-black text-black absolute bottom-2 right-2 bg-green-500 rounded-full p-2 w-11 h-11 transition-opacity duration-300' />
                      ) : null}
                    </div>
                    <p className="font-semibold text-gray-800">{item.author}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}