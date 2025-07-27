'use client'

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import {AuthButton} from "@/components/auth/auth-button";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const isActivePath = (path: string) => pathname === path;

    return (
        <div className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-[#2f2f38]/95 backdrop-blur-md shadow-lg'
                : 'bg-[#2f2f38]/80 backdrop-blur-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="font-bold text-xl text-white hover:text-gray-200 transition-colors relative group"
                    >
                        <span className="relative z-10">A-List Suites</span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-2">
                        {[
                            { href: '/suites', label: 'Suites' },
                            { href: '/apply', label: 'Apply' },
                            { href: '/blog', label: 'Blog' },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
                            >
                                <span className={`relative z-10 ${
                    isActivePath(item.href)
                        ? 'text-white'
                        : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                                {isActivePath(item.href) && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500"></span>
                                )}
                            </Link>
                        ))}
                        <div>
                            <AuthButton/>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#2f2f38] rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
                <div
                    className={`${
                        isMenuOpen
                            ? 'max-h-[400px] border-t border-white/10'
                            : 'max-h-0 border-t-0'
                    } md:hidden overflow-hidden transition-all duration-300 ease-in-out absolute top-full left-0 right-0 bg-[#2f2f38] backdrop-blur-lg shadow-lg rounded-b-xl`}
                >
                    <div className="px-4 py-2 space-y-1">
                        {[
                            { href: '/suites', label: 'Suites' },
                            { href: '/apply', label: 'Apply' },
                            { href: '/blog', label: 'Blog' },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={toggleMenu}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActivePath(item.href)
                                    ? 'text-white bg-white/10'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="py-3 px-4">
                            <AuthButton />
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}