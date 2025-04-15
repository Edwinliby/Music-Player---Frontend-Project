'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Bell, ExternalLink } from 'lucide-react'

export default function Profile({ isOpen, setIsOpen }) {
    const [isMenu, setIsMenu] = useState(false)
    const dropdownRef = useRef(null)

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className='z-50 absolute right-2 md:bottom-4 md:left-4 hidden md:flex items-center gap-4 w-fit' ref={dropdownRef}>
            <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                className='w-12 h-12 rounded-full bg-white/10 flex justify-center items-center cursor-pointer'
                onClick={() => setIsMenu(!isMenu)}
            >
                <img src="/bg.webp" alt="profile-pic" className='rounded-full w-9 h-9 object-cover' />
            </motion.div>
            {isOpen && (
                <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                    <Bell className='text-white hidden md:block hover:opacity-80' size={18} />
                </motion.div>
            )}

            {isMenu && (
                <div className="absolute left-0 bottom-14 w-40 bg-white rounded shadow-lg z-10">
                    <div className="py-1">
                        <a href="#" className="flex justify-between items-center px-4 py-3 hover:bg-gray-200">
                            Account
                            <ExternalLink size={16} />
                        </a>
                        <div className="border-t border-gray-700 my-1"></div>
                        <a href="#" className="flex justify-between items-center px-4 py-3 hover:bg-gray-200">
                            Support
                            <ExternalLink size={16} />
                        </a>
                        <a href="/dashboard/settings" className="block px-4 py-3 hover:bg-gray-200">
                            Settings
                        </a>
                        <div className="border-t border-gray-700 my-1"></div>
                        <a href="/" className="block px-4 py-3 hover:bg-gray-200">
                            Log out
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}