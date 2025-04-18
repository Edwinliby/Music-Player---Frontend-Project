'use client'

import { data } from '../../../../../../public/artistData'
import { motion } from 'framer-motion'
import Banner from './components/Banner'
import TopArtist from './components/TopArtist'

export default function Index() {
    return (
        <div className='w-full h-[calc(100%-4rem)] flex flex-col gap-4'>
            <div className='custom-scrollbar overflow-x-hidden pt-4'>
                <Banner />
                <TopArtist data={data} />

                <h2 className='text-xl font-extrabold sticky -top-0.5 z-10 p-4'>
                    You may also like
                </h2>
                <div className='custom-scrollbar h-[20rem] pb-6 md:pb-4'>
                    <div className='grid md:grid-cols-2 gap-2 md:gap-4 px-4 mb-10 md:mb-4'>
                        {data.map((item, index) => (
                            <motion.div
                                key={index}
                                className='flex items-center justify-between gap-2 p-2 rounded-md active:bg-gray-100 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.06 }}
                            >
                                <div className='flex items-center gap-2'>
                                    <img src={item.coverImg} alt={item.title} className='w-12 h-12 rounded object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='font-semibold'>{item.title}</p>
                                        <p className='text-sm text-gray-600'>{item.author}</p>
                                    </div>
                                </div>
                                <span className='text-sm'>{item.timestamp}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}