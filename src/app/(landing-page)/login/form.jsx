'use client';

import React, { useState } from 'react';
import Logo from '@/../public/mainLogo.webp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const [loadingButton, setLoadingButton] = useState(null);
    const router = useRouter();

    const handleSocialLogin = (provider) => {
        setLoadingButton(provider);
        setTimeout(() => router.push('/dashboard'), 1500);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoadingButton('login');
        setTimeout(() => router.push('/dashboard'), 1500);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setLoadingButton('signup');
        setTimeout(() => router.push('/dashboard'), 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center mb-6"
                >
                    <Image src={Logo} alt="Logo" width={200} height={200} />
                </motion.div>

                {/* Social Login Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-4"
                >
                    <p className="text-gray-500">Express login via Google and Facebook</p>
                </motion.div>

                {/* Social Login Buttons */}
                <div className="flex mb-8 gap-2">
                    {['google', 'facebook'].map((provider) => (
                        <motion.button
                            key={provider}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSocialLogin(provider)}
                            className="flex-1 bg-gray-100 py-3 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[var(--red)]/20"
                        >
                            {loadingButton === provider ? (
                                <span className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></span>
                            ) : (
                                <>
                                    <span className="mr-2 capitalize">{provider}</span>
                                    <span className="w-6 h-6 flex items-center justify-center text-gray-400">
                                        {/* SVG goes here — keep as is */}
                                    </span>
                                </>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Tabs */}
                <motion.div
                    className="flex bg-gray-100 rounded-t-lg p-1 w-fit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {['login', 'signup'].map((tab) => (
                        <motion.button
                            key={tab}
                            whileTap={{ scale: 0.95 }}
                            className={`py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-white text-gray-900' : 'text-gray-500 bg-transparent'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'login' ? 'Log in' : 'Sign up'}
                        </motion.button>
                    ))}
                </motion.div>

                {activeTab === 'login' ? (
                    <form
                        key="login"
                        onSubmit={handleLogin}
                    >
                        <input
                            type="text"
                            placeholder="email or username"
                            className="w-full p-4 bg-gray-100 rounded-r-lg focus:outline-none mb-1"
                        />

                        <div className="mb-1 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password"
                                className="w-full p-4 bg-gray-100 focus:outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                Show
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loadingButton === 'login'}
                            className="w-full py-4 bg-gray-900 text-white rounded-b-lg mb-1 font-medium flex justify-center"
                        >
                            {loadingButton === 'login' ? (
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                            ) : (
                                'Log in'
                            )}
                        </button>

                        <div className="text-center my-3">
                            <a href="#" className="text-gray-800 font-semibold hover:text-[var(--red)]">
                                Log in with SSO
                            </a>
                        </div>

                        <div className="text-center">
                            <a href="#" className="text-gray-800 font-semibold hover:text-[var(--red)]">
                                Forgot password?
                            </a>
                        </div>
                    </form>
                ) : (
                    <form
                        key="signup"
                        onSubmit={handleSignup}
                    >
                        <input
                            type="email"
                            placeholder="email"
                            className="w-full p-4 bg-gray-100 rounded-r-lg focus:outline-none mb-1"
                        />

                        <div className="mb-1 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password"
                                className="w-full p-4 bg-gray-100 focus:outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                Show
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loadingButton === 'signup'}
                            className="w-full py-4 bg-gray-900 text-white rounded-b-lg mb-4 font-medium flex justify-center"
                        >
                            {loadingButton === 'signup' ? (
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                            ) : (
                                'Sign up'
                            )}
                        </button>

                        <div className="flex items-start mb-4">
                            <div className="flex items-center h-5">
                                <input
                                    id="email-updates"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="email-updates" className="font-normal text-gray-500">
                                    Send me emails with the latest updates from Wave
                                </label>
                            </div>
                        </div>

                        <div className="text-sm text-gray-500">
                            By signing up you agree to our{' '}
                            <a href="#" className="text-gray-900 font-medium">Terms of Service</a> and{' '}
                            <a href="#" className="text-gray-900 font-medium">Privacy Policy</a>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default LoginPage;
