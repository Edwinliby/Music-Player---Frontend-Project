'use client'

import React from 'react';
import { ExternalLink, Volume2, Shield, Bell, Headphones } from 'lucide-react';
import NowPlaying from '../_components/NowPlaying';
import { useMusicPlayer } from '@/context/MusicPlayerContext';

const SettingsPage = () => {
    const { currentSong, isPlaying } = useMusicPlayer();

    return (
        <div className="h-full w-full flex justify-between">
            <div className='w-full lg:w-[73%] xl:w-[78%] flex flex-col'>
                <div className="custom-scrollbar overflow-x-hidden p-4 md:p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 sm:mb-10">
                            <h1 className="text-3xl sm:text-4xl font-extrabold">Settings</h1>
                        </div>

                        {/* Account Section */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Account</h2>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600 text-sm md:text-base">Edit login methods</div>
                                <button className="bg-transparent text-black border border-gray-300 rounded-full px-3 sm:px-4 py-1 flex items-center text-sm sm:text-base">
                                    Edit <ExternalLink size={16} className="ml-1" />
                                </button>
                            </div>
                        </section>

                        {/* Language Section */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Language</h2>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                <div className="text-gray-600 mb-2 md:mb-0 text-sm md:text-base">
                                    Choose language - Changes will be applied after restarting the app
                                </div>
                                <div className="relative w-full md:w-64">
                                    <select className="w-full text-sm md:text-base bg-gray-100 text-black py-2 px-4 pr-8 rounded appearance-none focus:outline-none border border-gray-300">
                                        <option>English (United Kingdom)</option>
                                        <option>English (United States)</option>
                                        <option>Español</option>
                                        <option>Français</option>
                                        <option>Deutsch</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Your Library Section */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Your Library</h2>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Use compact library layout</div>
                                    <Toggle name="compact-library" />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Show recently played tracks</div>
                                    <Toggle name="recent-tracks" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Group albums by artist</div>
                                    <Toggle name="group-albums" defaultChecked={true} />
                                </div>
                            </div>
                        </section>

                        {/* Display Section */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Display</h2>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Show the now-playing panel on click of play</div>
                                    <Toggle name="show-now-playing" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Display short, looping visuals on tracks (Canvas)</div>
                                    <Toggle name="display-visuals" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Enable dark mode</div>
                                    <Toggle name="dark-mode" />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">High contrast mode for accessibility</div>
                                    <Toggle name="high-contrast" />
                                </div>
                            </div>
                        </section>

                        {/* Playback Section - NEW */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                                <Volume2 size={20} className="mr-2" /> Playback
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Crossfade between songs</div>
                                    <Toggle name="crossfade" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Normalize volume across tracks</div>
                                    <Toggle name="normalize-volume" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Audio quality</div>
                                    <div className="relative w-full md:w-64">
                                        <select className="w-full text-sm md:text-base bg-gray-100 text-black py-2 px-4 pr-8 rounded appearance-none focus:outline-none border border-gray-300">
                                            <option>Automatic</option>
                                            <option>Low (96kbps)</option>
                                            <option>Medium (256kbps)</option>
                                            <option>High (320kbps)</option>
                                            <option>Lossless (FLAC)</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Enable gapless playback</div>
                                    <Toggle name="gapless" defaultChecked={true} />
                                </div>
                            </div>
                        </section>

                        {/* Notifications Section - NEW */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                                <Bell size={20} className="mr-2" /> Notifications
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">New music from followed artists</div>
                                    <Toggle name="artist-notifications" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">New playlist recommendations</div>
                                    <Toggle name="playlist-recommendations" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Product news and updates</div>
                                    <Toggle name="product-news" />
                                </div>
                            </div>
                        </section>

                        {/* Privacy Section - NEW */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                                <Shield size={20} className="mr-2" /> Privacy
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Make my listening activity public</div>
                                    <Toggle name="public-listening" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Show what I'm listening to in messaging apps</div>
                                    <Toggle name="share-listening" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Collect data for personalized recommendations</div>
                                    <Toggle name="collect-data" defaultChecked={true} />
                                </div>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">
                                    View privacy policy
                                </button>
                            </div>
                        </section>

                        {/* Advanced Section - NEW */}
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                                <Headphones size={20} className="mr-2" /> Advanced
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Enable hardware acceleration</div>
                                    <Toggle name="hardware-acceleration" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Start application on system startup</div>
                                    <Toggle name="auto-start" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Connect to streaming devices</div>
                                    <Toggle name="streaming-devices" defaultChecked={true} />
                                </div>
                                <div className="flex items-start justify-between sm:items-center gap-4 text-sm md:text-base">
                                    <div className="text-gray-600 mb-2 sm:mb-0">Beta features participation</div>
                                    <Toggle name="beta-features" />
                                </div>
                            </div>
                        </section>

                        {/* Version Info - NEW */}
                        <section className="mb-10">
                            <div className="text-xs md:text-sm text-gray-500">
                                <div>Version 0.1.0 (Build 1234)</div>
                                <div className="mt-1">© 2025 Wave Player</div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className='hidden lg:block w-[27%] xl:w-[22%]'>
                <NowPlaying song={currentSong} isPlaying={isPlaying} />
            </div>
        </div>
    );
};

const Toggle = ({ name, defaultChecked = false }) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    name={name}
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <div className={`w-12 h-6 rounded-full ${isChecked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${isChecked ? 'transform translate-x-6' : ''}`}></div>
            </div>
        </label>
    );
};

export default SettingsPage;