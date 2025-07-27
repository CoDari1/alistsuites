'use client';

import { animate, inView } from "motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Scissors, Brush } from 'lucide-react';
import { FaSpa } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      animate(
          heroRef.current,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.8 }
      );
    }

    // Text animation with delay
    if (textRef.current) {
      animate(
          textRef.current,
          { opacity: [0, 1] },
          { duration: 0.8, delay: 0.2 }
      );
    }

    // CTA buttons animation
    if (ctaRef.current) {
      animate(
          ctaRef.current,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.8, delay: 0.4 }
      );
    }

    // Setup scroll animations
    inView('section', (element) => {
      animate(
          element,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.8 }
      );
    });
  }, []);

  const featuredSuites = [
    {
      id: 1,
      name: "Styling Suite",
      price: "800",
      description: "Perfect for hair stylists with premium styling stations and ample storage",
      icon: <Scissors className="h-6 w-6 text-purple-400" />
    },
    {
      id: 2,
      name: "Spa Suite",
      price: "950",
      description: "Ideal for estheticians with tranquil atmosphere and specialized equipment",
      icon: <FaSpa className="h-6 w-6 text-purple-400" />
    },
    {
      id: 3,
      name: "Nail Studio",
      price: "750",
      description: "Designed for nail technicians with ventilation systems and ergonomic setup",
      icon: <Brush className="h-6 w-6 text-purple-400" />
    },
  ];

  return (
      <div className="bg-[#2f2f38] text-white min-h-screen relative">

        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-screen">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0">
            <Image
                src="https://picsum.photos/id/1056/1920/1080"
                alt="Salon suite interior"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
          </div>
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-2 sm:px-4">
            <div
                ref={heroRef}
                className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6"
            >
              A-List Salon Suites
            </div>
            <div
                ref={textRef}
                className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl"
            >
              Your Business. Your Brand. Your Success.
            </div>
            <div
                ref={ctaRef}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto justify-center items-center sm:items-start"
            >
              <Link
                  href="/suites"
                  className="bg-white text-[#2f2f38] px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#4a4a4f] hover:text-white transition-colors text-center"
              >
                Explore Suites
              </Link>
              <Link
                  href="/apply"
                  className="border border-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-white hover:text-[#2f2f38] transition-colors text-center"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Suites */}
        <section className="py-10 sm:py-20 px-2 sm:px-4 bg-[#4a4a4f]">
          <div className="max-w-7xl mx-auto">
            <div className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center">
              Featured Salon Suites
            </div>
            <p className="text-gray-300 text-center max-w-xl sm:max-w-3xl mx-auto mb-6 sm:mb-12 text-base sm:text-lg">
              Premium spaces designed specifically for beauty professionals. Take control of your career with our all-inclusive salon suites.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {featuredSuites.map((suite, index) => (
                  <div
                      key={suite.id}
                      className="bg-[#2f2f38] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="relative h-40 sm:h-64">
                      <Image
                          src={`https://picsum.photos/id/${365 + index}/800/600`}
                          alt={suite.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center mb-3">
                        {suite.icon}
                        <h3 className="text-xl font-bold ml-2">{suite.name}</h3>
                      </div>
                      <p className="text-gray-300 mb-3">{suite.description}</p>
                      <p className="text-purple-400 font-semibold mb-4">Starting at ${suite.price}/month</p>
                      <Link
                          href={`/suites/${suite.id}`}
                          className="flex items-center text-white hover:text-purple-400 transition-colors"
                      >
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-4xl font-bold mb-4 text-center">
              Why Choose A-List Salon Suites?
            </div>
            <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
              We provide everything you need to run a successful beauty business
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#3a3a42] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-400">100% Commission</h3>
                <p className="text-gray-300">Keep all your earnings and set your own prices without sharing revenue.</p>
              </div>
              <div className="bg-[#3a3a42] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Prime Location</h3>
                <p className="text-gray-300">Situated in high-traffic areas with excellent visibility and convenient parking.</p>
              </div>
              <div className="bg-[#3a3a42] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Flexible Hours</h3>
                <p className="text-gray-300">24/7 secure access allows you to set your own schedule and work when it suits you.</p>
              </div>
              <div className="bg-[#3a3a42] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Luxury Amenities</h3>
                <p className="text-gray-300">Full suite of amenities including utilities, WiFi, and common area maintenance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-900 to-purple-600">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Beauty Career?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community of successful beauty professionals. Take the first step toward salon ownership today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/suites"
                className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition"
              >
                Tour Our Suites
              </Link>
              <Link
                href="/apply"
                className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
}