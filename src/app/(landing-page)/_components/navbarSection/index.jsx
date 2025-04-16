'use client'

import Logo from '@/../public/mainLogo.webp';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react'

const navLinks = [
    { name: "About", link: "#about" },
    { name: "Features", link: "#features" },
];

const menuLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Features", link: "#features" },
    { name: "Get Started", link: "/login" },
];

const socialLinks = [
    { name: "Instagram", link: "#" },
    { name: "Linkedin", link: "#" },
    { name: "Twitter", link: "#" },
    { name: "YouTube", link: "#" },
]

export default function Navbar() {
    const [isHidden, setIsHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if user scrolled past 180px
            setHasScrolled(currentScrollY > 180);

            // Hide nav when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 180) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full px-4 md:px-6 lg:px-8 py-4 z-50 transition-all duration-300 flex items-center justify-between
            ${isHidden && !isOpen ? '-translate-y-full' : 'translate-y-0'}
            ${hasScrolled || isOpen ? 'bg-[var(--background)] shadow-lg' : 'bg-transparent'}
             `}
        >
            <Link href="/">
                <Image
                    src={Logo}
                    alt="logo"
                    draggable={false}
                    width={100}
                    height={100}
                    className={`w-[6rem] h-[2.75rem] 2xl:h-[4.5rem] object-contain`}
                />
            </Link>

            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6">
                {navLinks.map((item) => (
                    <Link
                        href={item.link}
                        key={item.name}
                        aria-label="links"
                        className={`font-medium hover:text-[var(--orange)] 2xl:text-xl mix-blend-difference`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center justify-start relative z-50 -right-2 md:-right-0">
                <Link
                    href="/login"
                    className={`text-xs md:text-sm font-medium bg-[var(--red)] rounded-4xl px-4 md:px-6 py-2 md:py-3 text-white transition duration-200 ease-in-out md:shadow-[3px_6px_0px_rgba(0,0,0,0.25)] hover:translate-x-[3px] hover:translate-y-[6px] hover:shadow-[0px_0px_0px_rgba(0,0,0,0.25)]
                        ${isOpen ? "hidden" : ""}
                        `}
                >
                    Get Started
                </Link>

                <button
                    onClick={toggleNavbar}
                    aria-label="Toggle menu"
                    className={`
                            ${"group md:hidden flex flex-col cursor-pointer w-12 h-12 items-center justify-center space-y-1.5 2xl:space-y-2 group focus:outline-none relative z-50"}
                            ${isOpen ? "md:translate-x-8 rounded-4xl shadow" : ""}
                            `}
                >
                    <span
                        className={`block h-0.5 2xl:h-1 w-6 2xl:w-8 transition-all duration-300 ease-in-out  bg-black
                            ${isOpen ? 'rotate-45 translate-y-2 rounded group-hover:bg-[var(--red)]' : ''}`}
                    />
                    <span
                        className={`block h-0.5 2xl:h-1 w-4 2xl:w-6 bg-black transition-all duration-300 ease-in-out self-start translate-x-5 2xl:translate-x-4
                            ${isOpen ? 'opacity-0' : ''}`}
                    />
                    <span
                        className={`block h-0.5 2xl:h-1 w-6 2xl:w-8 bg-black transition-all duration-300 ease-in-out 
                            ${isOpen ? '-rotate-45 -translate-y-2 rounded group-hover:bg-[var(--red)]' : ''}`}
                    />
                </button>
            </div>

            <div
                className={`fixed top-0 right-0 h-screen w-full md:w-[50%] lg:w-[35%] flex flex-col justify-center pl-2 md:pl-6 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-40`}
            >
                <div className="flex flex-col gap-6 p-4">
                    {menuLinks.map((item) => {
                        return (
                            <Link
                                href={item.link}
                                key={item.name}
                                aria-label="links"
                                onClick={toggleNavbar}
                                className={`text-black flex items-center gap-1 font-semibold hover:text-[var(--red)] text-xl`}
                            >
                                <ArrowRight /> {item.name}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex items-center flex-wrap gap-4 md:gap-6 absolute bottom-6 left-6">
                    {
                        socialLinks.map((item) => (
                            <Link
                                href={item.link}
                                key={item.name}
                                aria-label="links"
                                className={`text-black w-fit font-medium hover:text-[var(--red)] hover:-translate-y-2 transition duration-300 ease-in-out`}
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                </div>
            </div>

            {
                isOpen && (
                    <div
                        onClick={toggleNavbar}
                        className="fixed h-screen inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-xs bg-opacity-50 z-30"
                    />
                )
            }
        </nav >
    );
}