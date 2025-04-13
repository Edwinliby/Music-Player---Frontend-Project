'use client'

import Image from 'next/image';
import Box from '@/../public/box.webp';
import Tool from '@/../public/tool.webp';
import Disk from '@/../public/disk.webp';

export default function NowPlaying() {
    return (
        <div className='bg-white w-[25rem] h-full p-4 rounded-2xl overflow-hidden shadow'>
            <div className='relative'>
                <Image
                    src={Box}
                    alt='box'
                    className='w-full h-full'
                />
                <Image
                    src={Tool}
                    alt='tool'
                    className='absolute top-4 right-4 w-fit h-[15rem] z-10'
                />
                <Image
                    src={Disk}
                    alt='disk'
                    className='absolute top-5 left-6 w-[16.5rem] h-fit'
                />
                <button className='absolute bottom-9 right-9.5 w-3 h-5 bg-black/50'>
                    <span className='absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full'></span>
                </button>
            </div>
        </div>
    )
}
