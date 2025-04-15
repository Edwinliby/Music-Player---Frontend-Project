'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, House } from "lucide-react"
import { motion } from 'framer-motion'

export default function SearchBar({ className }) {
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef(null)

  // Handle Ctrl + K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <div className={`h-[6.5%] md:h-[12%] pb-2 md:pb-0 w-full flex items-center text-gray-400 gap-4 border-b border-gray-300 cursor-pointer ${className ? className : ''}`}>
        <motion.a whileHover={{ color: "#1DB954" }} whileTap={{ scale: 0.9, color: "#1DB954" }} className='cursor-pointer hidden md:block' href='/dashboard'><House /></motion.a>
        <div className='flex items-center justify-between gap-2 w-full group'>
          <Search />
          <input
            type="text"
            autoFocus
            placeholder="What do you want to play?"
            className="bg-transparent outline-none text-sm font-medium text-black placeholder-gray-400 w-full"
          />
          <kbd className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-gray-500 border border-gray-300 px-1 py-0.5 rounded bg-gray-50">
            Ctrl <span className="text-gray-400">+</span> K
          </kbd>
        </div>
      </div>

      {/* Modal overlay with input */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] flex items-center justify-center">
          <div
            ref={searchRef}
            className="bg-white rounded-xl shadow-lg w-full max-w-md px-6 py-4 flex items-center gap-3"
          >
            <Search className="text-gray-500" />
            <input
              type="text"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.stopPropagation()
                  setIsOpen(false)
                }
              }}
              placeholder="What do you want to play?"
              className="bg-transparent outline-none text-sm font-medium text-black placeholder-gray-400 w-full"
            />
          </div>
        </div>
      )}
    </>
  )
}
