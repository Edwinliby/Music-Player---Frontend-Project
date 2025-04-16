'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion'; // ✅ useInView imported
import Image from 'next/image';
import Link from 'next/link';
import h1 from '@/../public/hero/h1.webp';
import h2 from '@/../public/hero/h2.webp';
import h3 from '@/../public/hero/h3.webp';
import h4 from '@/../public/hero/h4.webp';
import h5 from '@/../public/hero/h5.webp';
import h6 from '@/../public/hero/h6.webp';
import h7 from '@/../public/hero/h7.webp';
import h8 from '@/../public/hero/h8.webp';
import h9 from '@/../public/hero/h9.webp';
import h10 from '@/../public/hero/h10.webp';

const imgData = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10];

const BUFFER = 60;
const CENTER_BUFFER = 40;

const isOverlappingCenter = (top, left, size, centerRect) => {
    return (
        left + size > centerRect.left - CENTER_BUFFER &&
        left < centerRect.right + CENTER_BUFFER &&
        top + size > centerRect.top - CENTER_BUFFER &&
        top < centerRect.bottom + CENTER_BUFFER
    );
};

const getRandomPosition = (usedPositions, imgSize, maxWidth, maxHeight, centerRect) => {
    let tries = 0;
    while (tries < 1000) {
        const left = Math.random() * (maxWidth - imgSize);
        const top = Math.random() * (maxHeight - imgSize);

        const isTooCloseToOther = usedPositions.some(
            (pos) =>
                Math.abs(pos.left - left) < imgSize + BUFFER &&
                Math.abs(pos.top - top) < imgSize + BUFFER
        );

        const isTooCloseToCenter = isOverlappingCenter(top, left, imgSize, centerRect);

        if (!isTooCloseToOther && !isTooCloseToCenter) {
            return { top, left };
        }
        tries++;
    }
    return { top: 0, left: 0 }; // fallback
};

export default function HeroSection() {
    const [positions, setPositions] = useState([]);
    const [imgSize, setImgSize] = useState(100);
    const [numImages, setNumImages] = useState(imgData.length);

    const centerRef = useRef(null);
    const containerRef = useRef(null); // ✅ For observing viewport
    const isInView = useInView(containerRef, { once: false, margin: '-50px' }); // ✅ Detect viewport presence

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const isMobile = width < 640;
            const size = isMobile ? 90 : 150;
            setImgSize(size);

            const imageCount = isMobile ? 8 : imgData.length;
            setNumImages(imageCount);

            setTimeout(() => {
                const used = [];

                const centerRect = centerRef.current?.getBoundingClientRect() || {
                    top: height / 3,
                    left: width / 3,
                    right: (width * 2) / 3,
                    bottom: (height * 2) / 3,
                };

                const newPositions = imgData.slice(0, imageCount).map(() => {
                    const pos = getRandomPosition(used, size, width, height, centerRect);
                    used.push(pos);
                    return pos;
                });

                setPositions(newPositions);
            }, 0); // Wait for layout
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            ref={containerRef} // ✅ Tracking this wrapper
            id="hero"
            className="relative h-screen overflow-hidden flex items-center justify-center px-4 sm:px-8"
        >
            <div
                ref={centerRef}
                className="flex flex-col gap-4 text-center items-center z-30"
            >
                <Link
                    href='/login'
                    className="text-xs md:text-lg xl:text-2xl font-medium bg-[var(--red)] rounded-4xl px-4 md:px-6 py-2 md:py-3 text-white transition duration-200 ease-in-out md:shadow-[3px_6px_0px_rgba(0,0,0,0.25)] hover:translate-x-[3px] hover:translate-y-[6px] hover:shadow-[0px_0px_0px_rgba(0,0,0,0.25)]"
                >
                    Join Now
                </Link>
            </div>

            {isInView && positions.length > 0 &&
                imgData.slice(0, numImages).map((img, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                            top: positions[i].top,
                            left: positions[i].left,
                            width: imgSize,
                            height: imgSize,
                        }}
                    >
                        <Image
                            src={img}
                            alt={`Hero image ${i}`}
                            width={imgSize}
                            height={imgSize}
                            className="rounded object-cover transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </motion.div>
                ))}
        </div>
    );
}