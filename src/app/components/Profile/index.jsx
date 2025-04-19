'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'

export default function Profile({ isOpen, setIsOpen }) {
    const [isMenu, setIsMenu] = useState(false)
    const dropdownRef = useRef(null)

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
        <div className='z-50 absolute top-2 right-2 md:top-auto md:bottom-4 md:left-4 w-fit h-fit' ref={dropdownRef}>
            <div className={`relative flex items-center gap-2 md:gap-4 ${isOpen ? 'flex-row-reverse md:flex-row' : 'flex-col-reverse'}`}>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className='w-12 h-12 rounded-full bg-white/10 flex justify-center items-center cursor-pointer'
                    onClick={() => setIsMenu(!isMenu)}
                >
                    <img src="/form.jpg" draggable={false} alt="profile-pic" className='rounded-full w-9 h-9 object-cover' />
                </motion.div>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <Bell className="text-black md:text-white hover:opacity-80" size={18} />
                </motion.div>

                {isMenu && (
                    <div className="absolute right-2 top-14 bottom-auto md:top-auto md:left-0 md:bottom-16 w-40 bg-gray-900 shadow shadow-gray-700 text-white rounded z-10">
                        <div className="py-1">
                            <a href="/dashboard/profile" className="flex justify-between items-center px-4 py-3 hover:bg-gray-800">
                                Profile
                            </a>
                            <div className="border-t border-t-gray-700 my-1"></div>
                            <a href="#" className="flex justify-between items-center px-4 py-3 hover:bg-gray-800">
                                Support
                            </a>
                            <a href="/dashboard/settings" className="block px-4 py-3 hover:bg-gray-800">
                                Settings
                            </a>
                            <div className="border-t border-t-gray-700 my-1"></div>
                            <a href="/" className="block px-4 py-3 hover:bg-gray-800">
                                Log out
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}