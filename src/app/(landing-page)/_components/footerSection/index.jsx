import React from 'react';
import { Twitter, Linkedin, Github, Headphones } from 'lucide-react';

const Footer = () => {
    return (
        <div id='footer' className='p-2 md:p-6 mt-4'>
            <div className="text-white p-6 md:p-12 rounded-2xl relative overflow-hidden">
                <img src="/footerBg.webp" alt="bg" draggable="false" className='-z-10 absolute top-0 left-0 w-full h-full object-cover' />
                <div className="mx-auto">
                    {/* Main footer navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8 mb-10">
                        {/* Services Column */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Services</h3>
                            <ul className="space-y-3">
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Subscription Plans</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Premium Features</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Artist Collaborations</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Indie Label Platform</a></li>
                            </ul>
                        </div>

                        {/* Discover Column */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Discover</h3>
                            <ul className="space-y-3">
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">New Releases</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Playlists & Charts</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Music Blog</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Live Sessions</a></li>
                            </ul>
                        </div>

                        {/* Support Column */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Support</h3>
                            <ul className="space-y-3">
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Help Center</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Community Forum</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Device Compatibility</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Artist Resources</a></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">About Wave Player</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Careers</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Press Kit</a></li>
                                <li><a href="#footer" className="text-gray-300 hover:text-[#BF301E]">Legal Information</a></li>
                            </ul>
                        </div>

                        {/* Twitter Card */}
                        <div className="flex justify-end mb-10">
                            <div className="backdrop-blur-lg overflow-hidden shadow-2xl bg-white/5 rounded-lg p-4 max-w-xs">
                                <div className="flex items-center mb-2">
                                    <div className="bg-[#BF301E] rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                        <Headphones size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Wave Player</p>
                                        <p className="text-gray-400 text-sm">@waveplayer</p>
                                    </div>
                                    <div className="ml-auto">
                                        <Twitter size={20} className="text-gray-400" />
                                    </div>
                                </div>
                                <p className="text-sm">Just launched our new spatial audio feature! Experience music like never before with Wave Player's immersive 3D sound.</p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-700 my-6"></div>

                    {/* Footer bottom */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="mr-2 flex items-center justify-center">
                                <img src="/logo.webp" alt="logo" className='object-contain w-10 h-10' />
                            </div>
                            <p className="text-gray-400">Wave Player, 2025.</p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://github.com/Edwinliby" target='_blank' className="bg-gray-800 p-2 rounded-full hover:bg-gray-600">
                                <Github size={20} className="text-white/60 hover:text-[#BF301E]" />
                            </a>
                            <a href="https://www.linkedin.com/in/edwinliby/" target='_blank' className="bg-gray-800 p-2 rounded-full hover:bg-gray-600">
                                <Linkedin size={20} className="text-white/60 hover:text-[#BF301E]" />
                            </a>
                            <a href="https://x.com/EdwinLiby" target='_blank' className="bg-gray-800 p-2 rounded-full hover:bg-gray-600">
                                <Twitter size={20} className="text-white/60 hover:text-[#BF301E]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;