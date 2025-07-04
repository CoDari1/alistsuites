'use client';

import { animate, inView } from "motion";
import { useEffect, useRef } from "react";
import { ArrowRight } from 'lucide-react';
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
    { id: 1, name: "Luxury Suite 1", price: "2,500" },
    { id: 2, name: "Luxury Suite 2", price: "3,200" },
    { id: 3, name: "Luxury Suite 3", price: "4,100" },
  ];

  return (
      <div className="bg-[#2f2f38] text-white min-h-screen relative">

        {/* Hero Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0">
            <Image
                src="https://picsum.photos/seed/hero-suite/1920/1080"
                alt="Hero background"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
          </div>
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
            <div
                ref={heroRef}
                className="text-6xl md:text-7xl font-bold mb-6"
            >
              A-List Suites
            </div>
            <div
                ref={textRef}
                className="text-xl md:text-2xl mb-8 max-w-2xl"
            >
              Luxury Living Redefined.
            </div>
            <div
                ref={ctaRef}
                className="flex gap-4"
            >
              <Link
                  href="/suites"
                  className="bg-white text-[#2f2f38] px-6 py-3 rounded-md hover:bg-[#4a4a4f] hover:text-white transition-colors"
              >
                View Suites
              </Link>
              <Link
                  href="/apply"
                  className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-[#2f2f38] transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Suites */}
        <section className="py-20 px-4 bg-[#4a4a4f]">
          <div className="max-w-7xl mx-auto">
            <div className="text-4xl font-bold mb-12 text-center">
              Featured Suites
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredSuites.map((suite) => (
                  <div
                      key={suite.id}
                      className="bg-[#2f2f38] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="relative h-64">
                      <Image
                          src={`https://picsum.photos/seed/suite${suite.id}/600/400`}
                          alt={suite.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{suite.name}</h3>
                      <p className="text-gray-300 mb-4">Starting from ${suite.price}/month</p>
                      <Link
                          href={`/suites/${suite.id}`}
                          className="flex items-center text-white hover:text-gray-300"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}