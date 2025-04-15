'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Music,
    PanelRightClose,
    PanelLeftClose,
    Logs,
    Podcast,
    AudioWaveform,
    House,
    Library,
} from 'lucide-react'

export default function Sidebar({ isOpen, setIsOpen }) {
    const [isHovered, setIsHovered] = useState(false)

    const toggleSidebar = () => setIsOpen(!isOpen)

    return (
        <>
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={false}
                animate={{ width: isOpen ? '20rem' : '10rem' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hidden md:flex flex-col gap-16 overflow-x-visible absolute top-0 left-0 h-full z-10 text-white bg-black/50 backdrop-blur-2xl px-4 xl:px-6 py-8"
            >
                {/* Toggle Button */}
                <div
                    onClick={toggleSidebar}
                    className="cursor-pointer flex items-center gap-2 text-sm"
                >
                    {isHovered ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOpen ? 'left' : 'right'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isOpen ? <PanelLeftClose /> : <PanelRightClose />}
                            </motion.div>
                        </AnimatePresence>
                    ) : <Logs />}
                </div>

                {/* Main Navigation */}
                <div className="flex flex-col gap-8 text-sm">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3, ease: 'easeInOut' }}
                        className="flex flex-col gap-8"
                    >
                        <SidebarItem icon={<House size={20} />} label="Home" isOpen={isOpen} link="/dashboard" />
                        <SidebarItem icon={<AudioWaveform size={20} />} label="Explore" isOpen={isOpen} link="/dashboard/explore" />
                        <SidebarItem icon={<Music size={20} />} label="Artists" isOpen={isOpen} link="/dashboard/artists" />
                        {/* <SidebarItem icon={<Library size={20} />} label="Library" isOpen={isOpen} link="/dashboard/library" /> */}
                        <SidebarItem icon={<Podcast size={20} />} label="Podcasts" isOpen={isOpen} link="/dashboard/podcasts" />
                    </motion.div>
                </div>
            </motion.div>

            <div className='md:hidden bg-white w-full fixed bottom-0 left-0 h-14 z-50 flex justify-between items-center px-4'>
                <a href="/dashboard" className="w-14 bg-red flex flex-col items-center"><House size={25} /> <span className='text-[.6rem]'>Home</span></a>
                <a href="/dashboard/explore" className="w-14 bg-red flex flex-col items-center"><AudioWaveform size={25} /> <span className='text-[.6rem]'>Explore</span></a>
                {/* <a href="/dashboard/library" className="w-14 bg-red flex flex-col items-center"><Library size={25} /> <span className='text-[.6rem]'>Library</span></a> */}
                <a href="/dashboard/artists" className="w-14 bg-red flex flex-col items-center"><Music size={25} /> <span className='text-[.6rem]'>Artists</span></a>
                <a href="/dashboard/podcasts" className="w-14 bg-red flex flex-col items-center"><Podcast size={25} /> <span className='text-[.6rem]'>Podcasts</span></a>
            </div>
        </>
    )
}

function SidebarItem({ icon, label, link, isOpen }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={link} className="underline-none">
            <motion.div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                whileTap={{ scale: 0.975 }}
                className="relative flex items-center gap-4 cursor-pointer hover:opacity-80 h-4"
            >
                {icon}

                {/* Show label if sidebar is open */}
                {isOpen && (
                    <motion.span
                        key="open-label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {label}
                    </motion.span>
                )}

                {/* Show label if sidebar is closed and hovered */}
                {!isOpen && hovered && (
                    <motion.span
                        key="hover-label"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs absolute -left-4 -top-6 text-white bg-gray-900 backdrop-blur-2xl break-words px-2"
                    >
                        {label}
                    </motion.span>
                )}
            </motion.div>
        </Link>
    );
}
