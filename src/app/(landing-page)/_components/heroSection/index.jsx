'use client'

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

const CENTER_BUFFER = 60;
const GRID_COLS = 5;
const GRID_ROWS = 4;

export default function HeroSection() {
    const [positions, setPositions] = useState([]);
    const centerRef = useRef(null);

    useEffect(() => {
        const imgSize = 300;
        const usedCells = new Set();
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;
        const cellWidth = maxWidth / GRID_COLS;
        const cellHeight = maxHeight / GRID_ROWS;

        const centerRect = centerRef.current?.getBoundingClientRect() || {
            top: maxHeight / 3,
            left: maxWidth / 3,
            right: (maxWidth * 2) / 3,
            bottom: (maxHeight * 2) / 3,
        };

        const isInCenter = (x, y) => {
            const px = x * cellWidth;
            const py = y * cellHeight;
            return (
                px + imgSize > centerRect.left - CENTER_BUFFER &&
                px < centerRect.right + CENTER_BUFFER &&
                py + imgSize > centerRect.top - CENTER_BUFFER &&
                py < centerRect.bottom + CENTER_BUFFER
            );
        };

        const positions = [];

        while (positions.length < imgData.length) {
            const x = Math.floor(Math.random() * GRID_COLS);
            const y = Math.floor(Math.random() * GRID_ROWS);
            const key = `${x}-${y}`;

            if (usedCells.has(key) || isInCenter(x, y)) continue;

            usedCells.add(key);
            positions.push({
                left: x * cellWidth + cellWidth / 2 - imgSize / 2,
                top: y * cellHeight + cellHeight / 2 - imgSize / 2,
            });
        }

        setPositions(positions);
    }, []);

    return (
        <div id="hero" className="relative h-screen overflow-hidden flex items-center justify-center">
            <motion.div
                ref={centerRef}
                className="flex flex-col gap-4 text-center items-center z-50 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl xl:text-6xl font-medium uppercase"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Wanna Break From The Ads <br /> And Enjoy The Music
                </motion.h1>
                <motion.p
                    className="md:w-3/4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    Explore a world of music without the distractions of ads. Discover a new way to immerse yourself in your favorite tunes.
                </motion.p>
            </motion.div>

            {positions.length > 0 &&
                imgData.map((img, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        style={{
                            top: positions[i].top,
                            left: positions[i].left,
                            width: 100,
                            height: 100,
                        }}
                    >
                        <Image
                            src={img}
                            alt={`Hero image ${i}`}
                            width={150}
                            height={150}
                            className="object-cover hover:scale-105 transition-all duration-200 ease-in-out"
                        />
                    </motion.div>
                ))}
        </div>
    );
}
