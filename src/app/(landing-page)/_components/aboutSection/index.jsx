'use client'

import { motion } from "framer-motion"

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.3,
        },
    },
}

const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function AboutSection() {
    return (
        <div id="features" className="flex flex-col">
            <section className="bg-gradient-to-b from-white to-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-black via-[#313131] to-[#666666]"
                        >
                            Made for Every Moment
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="mt-5 max-w-2xl mx-auto text-lg text-gray-600"
                        >
                            Explore features designed to elevate your music experience — from smart discovery to seamless streaming.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: "🎧", title: "Endless Streaming", desc: "Play millions of songs without ads. Anytime, anywhere, at full quality.", color: "indigo" },
                            { icon: "🌟", title: "Smart Discovery", desc: "Get personalized playlists and daily mixes that match your vibe.", color: "green" },
                            { icon: "⚡", title: "Ultra-fast Playback", desc: "Enjoy instant load times, smooth transitions, and zero buffering.", color: "pink" },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                            >
                                <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-${feature.color}-100 text-${feature.color}-600 rounded-full text-3xl`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="h-fit w-full flex flex-col justify-center items-center gap-4 overflow-hidden py-14">
                {/* Top staggered image group */}
                <motion.div
                    className="relative -right-[6rem] flex items-center justify-center gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.img
                        variants={imageVariants}
                        src="/hero/s1.webp"
                        alt="platform-img"
                        className="w-full md:h-[28rem] object-cover shadow rounded-2xl"
                    />
                    <motion.img
                        variants={imageVariants}
                        src="/hero/s2.webp"
                        alt="platform-img"
                        className="w-full md:h-[28rem] object-cover shadow rounded-2xl relative -bottom-[5rem]"
                    />
                </motion.div>

                {/* Logo animation */}
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    src="/mainLogo.webp"
                    alt="logo-img"
                    className="w-fit h-[4rem] object-contain"
                />

                {/* Bottom staggered image group */}
                <motion.div
                    className="relative -left-[6rem] flex items-center justify-center gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.img
                        variants={imageVariants}
                        src="/hero/s3.webp"
                        alt="platform-img"
                        className="w-full md:h-[28rem] object-cover shadow rounded-2xl relative -top-[5rem]"
                    />
                    <motion.img
                        variants={imageVariants}
                        src="/hero/s4.webp"
                        alt="platform-img"
                        className="w-full md:h-[28rem] object-cover shadow rounded-2xl"
                    />
                </motion.div>
            </section>
        </div>
    )
}