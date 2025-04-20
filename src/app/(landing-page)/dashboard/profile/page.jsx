'use client'

import React, { useState } from 'react';
import { Play, Pause, Clock, Heart, Music, Users, Calendar, Award } from 'lucide-react';

const SpotifyUserPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState('playlists');

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <div className="h-full w-full flex flex-col text-gray-900">
            <div className="custom-scrollbar overflow-x-hidden">

                {/* Header  */}
                <div className="relative mb-6">
                    <div className="h-56 w-full bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400" />
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
                        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-24">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-6 bg-gray-300">
                                <img
                                    src="/form.jpg"
                                    alt="Profile Pic"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center md:text-left pb-1">
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="bg-gray-800 text-white text-xs rounded-full px-3 py-1 font-bold mb-2">VERIFIED USER</div>
                                </div>
                                <h1 className="text-3xl md:text-6xl font-extrabold mb-4 text-gray-800">Alex Kurup</h1>
                                <div className="flex items-center text-sm gap-4 md:gap-0">
                                    <div className="flex items-center">
                                        <Users size={16} className="mr-1 text-gray-500" />
                                        <span className="text-gray-600"><span className="font-bold text-gray-800">12</span> Followers</span>
                                    </div>
                                    <span className="hidden md:inline mx-2">•</span>
                                    <div className="flex items-center">
                                        <Music size={16} className="mr-1 text-gray-500" />
                                        <span className="text-gray-600"><span className="font-bold text-gray-800">2</span> Playlists</span>
                                    </div>
                                    <span className="hidden md:inline mx-2">•</span>
                                    <div className="flex items-center">
                                        <Calendar size={16} className="mr-1 text-gray-500" />
                                        <span className="text-gray-600">Since 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-300">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex overflow-x-auto scrollbar-hide space-x-6">
                            <button
                                className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'playlists' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                onClick={() => setActiveTab('playlists')}
                            >
                                PLAYLISTS
                            </button>
                            <button
                                className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'topTracks' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                onClick={() => setActiveTab('topTracks')}
                            >
                                TOP TRACKS
                            </button>
                            <button
                                className={`py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'artists' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                onClick={() => setActiveTab('artists')}
                            >
                                ARTISTS
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content container */}
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {activeTab === 'playlists' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Public Playlists</h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-10 md:mb-8">
                                {[1, 2].map((playlist) => (
                                    <div key={playlist} className="group relative">
                                        <div>
                                            <div className="relative">
                                                <img
                                                    src={`/hero/h${playlist + 2}.webp`}
                                                    alt={`Playlist ${playlist}`}
                                                    className="w-full aspect-square object-cover rounded-xl overflow-hidden"
                                                />
                                                <button
                                                    onClick={togglePlay}
                                                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-md translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                                >
                                                    {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-1" />}
                                                </button>
                                            </div>
                                            <div className="pt-3">
                                                <h3 className="font-bold mb-1 truncate">{`Vibes ${playlist}`}</h3>
                                                <p className="text-xs text-gray-500 truncate">Created by Alex Kurup</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Top Tracks section */}
                    {activeTab === 'topTracks' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">Top Tracks of the month</h2>
                                <button className="text-gray-800 text-sm font-medium">See All</button>
                            </div>

                            {/* Desktop table view */}
                            <div className="hidden md:block bg-white rounded-xl overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-4 px-4 w-12">#</th>
                                            <th className="py-4 px-4">TITLE</th>
                                            <th className="py-4 px-4">ALBUM</th>
                                            <th className="py-4 px-4 text-right flex justify-end">
                                                <Clock size={16} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5].map((track) => (
                                            <tr key={track} className="hover:bg-gray-50 transition-colors group">
                                                <td className="py-3 px-4">{track}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center">
                                                        <div className="relative min-w-10 w-10 h-10 mr-4">
                                                            <img
                                                                src={`/hero/h${track}.webp`}
                                                                alt={`Track ${track}`}
                                                                className="w-10 h-10 object-cover rounded shadow"
                                                            />
                                                            <div className="absolute inset-0 bg-black/25 bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                <Play size={14} className="text-white" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Summer Feels</p>
                                                            <p className="text-sm text-gray-500">The Groove</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-500">Sunshine Vibes</td>
                                                <td className="py-3 px-4 text-gray-500 text-right">3:45</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile card view */}
                            <div className="md:hidden space-y-3 mb-10 md:mb-8">
                                {[1, 2, 3, 4, 5].map((track) => (
                                    <div key={track} className="bg-white p-3 rounded-xl flex items-center shadow-sm">
                                        <span className="text-gray-500 mr-3 w-4 text-center">{track}</span>
                                        <div className="relative min-w-12 w-12 h-12 mr-3">
                                            <img
                                                src={`/hero/h${track}.webp`}
                                                alt={`Track ${track}`}
                                                className="w-12 h-12 object-cover rounded shadow"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                                                <Play size={14} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">Summer Feels</p>
                                            <p className="text-xs text-gray-500 truncate">The Groove • Sunshine Vibes</p>
                                        </div>
                                        <span className="text-gray-500 ml-2 text-sm">3:45</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Top Artists section */}
                    {activeTab === 'artists' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">Top Artists of the month</h2>
                                <a href='/dashboard/artists' className="text-gray-800 text-sm font-medium">See All</a>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-10 md:mb-8">
                                {[1, 2, 3, 4, 5, 6].map((artist) => (
                                    <div key={artist} className="group">
                                        <div className="relative mb-3 rounded-full overflow-hidden aspect-square bg-gray-200 p-0.5">
                                            <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute inset-0.5 rounded-full overflow-hidden bg-white">
                                                <img
                                                    src={`/artist/${artist}.webp`}
                                                    alt={`Artist ${artist}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 group-hover:bg-black/35 transition-all flex items-center justify-center">
                                                    <Heart size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium truncate">The {artist === 1 ? 'Groove' : artist === 2 ? 'Melody' : artist === 3 ? 'Beat' : artist === 4 ? 'Rhythm' : artist === 5 ? 'Harmony' : 'Flow'}</p>
                                            <div className="flex items-center justify-center">
                                                <Award size={12} className="text-gray-800 mr-1" />
                                                <p className="text-xs text-gray-500">Top Artist</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SpotifyUserPage;