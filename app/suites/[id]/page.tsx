'use client'

import React, { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaWifi, FaParking, FaChair, FaLeaf, FaKey, FaLock, FaRegCalendarAlt, FaArrowLeft, FaStar, FaRuler, FaDollarSign, FaClock } from 'react-icons/fa'
import { MdCleaningServices, MdMeetingRoom, MdLocationOn, MdPhotoLibrary } from 'react-icons/md'
// Mock data - in a real app, you would fetch this from an API based on the ID
const suiteData = {
  1: {
    id: 1,
    name: 'Premium Styling Suite',
    description: 'Our most popular salon suite designed specifically for hair stylists who want to elevate their business. This spacious suite offers premium fixtures, ample storage, and a sophisticated environment to impress your clients.',
    size: '200 sq ft',
    price: '$800/month',
    location: 'Downtown - 123 Main Street',
    availability: 'Available Now',
    leaseTerms: ['6-month minimum', '10% discount for annual lease', 'Utilities included', 'No commission fees'],
    amenities: [
      'Private entrance',
      'Built-in storage',
      'Shampoo station',
      'Premium lighting',
      'Styling chair',
      'Large mirror wall',
      'Product display shelving',
      'Retail space'
    ],
    includedServices: [
      { name: 'High-Speed WiFi', icon: <FaWifi className="text-xl" /> },
      { name: 'Reserved Parking', icon: <FaParking className="text-xl" /> },
      { name: 'Modern Equipment', icon: <FaChair className="text-xl" /> },
      { name: '24/7 Access', icon: <FaKey className="text-xl" /> },
      { name: 'Security System', icon: <FaLock className="text-xl" /> },
      { name: 'Weekly Cleaning', icon: <MdCleaningServices className="text-xl" /> },
      { name: 'Break Room Access', icon: <MdMeetingRoom className="text-xl" /> },
      { name: 'Eco-Friendly Building', icon: <FaLeaf className="text-xl" /> },
    ],
    images: [
      { url: 'https://picsum.photos/id/238/1200/800', alt: 'Premium styling suite main view' },
      { url: 'https://picsum.photos/id/156/1200/800', alt: 'Premium styling suite angle view' },
      { url: 'https://picsum.photos/id/342/1200/800', alt: 'Premium styling suite styling station' },
      { url: 'https://picsum.photos/id/65/1200/800', alt: 'Premium styling suite storage' },
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Hair Stylist',
        image: 'https://picsum.photos/id/64/200/200',
        text: 'Moving into this Premium Styling Suite was the best business decision I&apos;ve made. My clients love the professional atmosphere, and I&apos;ve been able to increase my prices by 30%.'
      },
      {
        name: 'Michael Rodriguez',
        role: 'Barber',
        image: 'https://picsum.photos/id/91/200/200',
        text: 'The suite has everything I need, and the location brings in so much foot traffic. I was fully booked within my first month!'
      }
    ],
    features: [
      { name: 'Size', value: '200 sq ft', icon: <FaRuler className="text-xl text-purple-400" /> },
      { name: 'Monthly Rate', value: '$800', icon: <FaDollarSign className="text-xl text-purple-400" /> },
      { name: 'Availability', value: 'Immediate', icon: <FaClock className="text-xl text-purple-400" /> },
      { name: 'Location', value: 'Downtown', icon: <MdLocationOn className="text-xl text-purple-400" /> },
    ]
  },
  2: {
    id: 2,
    name: 'Deluxe Nail Studio',
    description: 'A specialized suite designed for nail technicians with proper ventilation, ergonomic workstations, and a calming atmosphere. Perfect for building a high-end nail business with all the technical requirements covered.',
    size: '180 sq ft',
    price: '$750/month',
    location: 'Downtown - 123 Main Street',
    availability: 'Available June 1',
    leaseTerms: ['6-month minimum', '10% discount for annual lease', 'Utilities included', 'No commission fees'],
    amenities: [
      'Ventilation system',
      'Manicure table',
      'Pedicure chair',
      'Product display',
      'Specialized lighting',
      'Storage cabinets',
      'Retail area',
      'Hand washing station'
    ],
    includedServices: [
      { name: 'High-Speed WiFi', icon: <FaWifi className="text-xl" /> },
      { name: 'Reserved Parking', icon: <FaParking className="text-xl" /> },
      { name: 'Modern Equipment', icon: <FaChair className="text-xl" /> },
      { name: '24/7 Access', icon: <FaKey className="text-xl" /> },
      { name: 'Security System', icon: <FaLock className="text-xl" /> },
      { name: 'Weekly Cleaning', icon: <MdCleaningServices className="text-xl" /> },
      { name: 'Break Room Access', icon: <MdMeetingRoom className="text-xl" /> },
      { name: 'Eco-Friendly Building', icon: <FaLeaf className="text-xl" /> },
    ],
    images: [
      { url: 'https://picsum.photos/id/177/1200/800', alt: 'Nail studio main view' },
      { url: 'https://picsum.photos/id/162/1200/800', alt: 'Nail studio workstation' },
      { url: 'https://picsum.photos/id/152/1200/800', alt: 'Nail studio pedicure area' },
      { url: 'https://picsum.photos/id/106/1200/800', alt: 'Nail studio storage' },
    ],
    testimonials: [
      {
        name: 'Jennifer Lee',
        role: 'Nail Artist',
        image: 'https://picsum.photos/id/57/200/200',
        text: 'The ventilation system is amazing! My clients always comment on how fresh the air is, unlike other nail salons. The space is perfect for my specialized nail art services.'
      },
      {
        name: 'Tiffany Wong',
        role: 'Nail Technician',
        image: 'https://picsum.photos/id/28/200/200',
        text: 'I love how the studio is designed specifically for nail services. Having my own space has allowed me to build a luxury nail brand.'
      }
    ],
    features: [
      { name: 'Size', value: '180 sq ft', icon: <FaRuler className="text-xl text-purple-400" /> },
      { name: 'Monthly Rate', value: '$750', icon: <FaDollarSign className="text-xl text-purple-400" /> },
      { name: 'Availability', value: 'June 1', icon: <FaClock className="text-xl text-purple-400" /> },
      { name: 'Location', value: 'Downtown', icon: <MdLocationOn className="text-xl text-purple-400" /> },
    ]
  },
  // Additional suites data would follow the same pattern
  3: {
    id: 3,
    name: 'Spa Treatment Room',
    description: 'A tranquil and private suite perfect for estheticians, massage therapists, and wellness practitioners. Soundproofed for complete relaxation with adjustable lighting and a serene atmosphere.',
    size: '220 sq ft',
    price: '$900/month',
    location: 'Downtown - 123 Main Street',
    availability: 'Waitlist',
    leaseTerms: ['6-month minimum', '10% discount for annual lease', 'Utilities included', 'No commission fees'],
    amenities: [
      'Sound insulation',
      'Sink',
      'Storage cabinets',
      'Adjustable lighting',
      'Treatment table',
      'Aromatherapy diffuser',
      'Towel warmer',
      'Product storage'
    ],
    includedServices: [
      { name: 'High-Speed WiFi', icon: <FaWifi className="text-xl" /> },
      { name: 'Reserved Parking', icon: <FaParking className="text-xl" /> },
      { name: 'Modern Equipment', icon: <FaChair className="text-xl" /> },
      { name: '24/7 Access', icon: <FaKey className="text-xl" /> },
      { name: 'Security System', icon: <FaLock className="text-xl" /> },
      { name: 'Weekly Cleaning', icon: <MdCleaningServices className="text-xl" /> },
      { name: 'Break Room Access', icon: <MdMeetingRoom className="text-xl" /> },
      { name: 'Eco-Friendly Building', icon: <FaLeaf className="text-xl" /> },
    ],
    images: [
      { url: 'https://picsum.photos/id/265/1200/800', alt: 'Spa room main view' },
      { url: 'https://picsum.photos/id/249/1200/800', alt: 'Spa room treatment area' },
      { url: 'https://picsum.photos/id/250/1200/800', alt: 'Spa room storage' },
      { url: 'https://picsum.photos/id/177/1200/800', alt: 'Spa room sink area' },
    ],
    testimonials: [
      {
        name: 'Alicia Gomez',
        role: 'Esthetician',
        image: 'https://picsum.photos/id/26/200/200',
        text: 'The sound insulation is incredible - my clients can completely relax without any outside noise. The atmosphere is perfect for my high-end facials and skin treatments.'
      },
      {
        name: 'David Chen',
        role: 'Massage Therapist',
        image: 'https://picsum.photos/id/22/200/200',
        text: 'Having my own spa suite has allowed me to create the exact environment my clients need for therapeutic massage. The adjustable lighting is a game-changer.'
      }
    ],
    features: [
      { name: 'Size', value: '220 sq ft', icon: <FaRuler className="text-xl text-purple-400" /> },
      { name: 'Monthly Rate', value: '$900', icon: <FaDollarSign className="text-xl text-purple-400" /> },
      { name: 'Availability', value: 'Waitlist', icon: <FaClock className="text-xl text-purple-400" /> },
      { name: 'Location', value: 'Downtown', icon: <MdLocationOn className="text-xl text-purple-400" /> },
    ]
  },
  // Add data for suites 4, 5, 6 as well
  4: {
    id: 4,
    name: 'Standard Styling Suite',
    description: 'An efficient and affordable option for stylists starting their independent journey. This suite provides all the essentials in a professional environment with shared amenities.',
    size: '175 sq ft',
    price: '$650/month',
    location: 'Downtown - 123 Main Street',
    availability: 'Available Now',
    leaseTerms: ['6-month minimum', '10% discount for annual lease', 'Utilities included', 'No commission fees'],
    amenities: [
      'Styling chair',
      'Mirror',
      'Basic storage',
      'Shared shampoo area',
      'Reception area access',
      'Retail display option',
      'Color mixing area',
      'Tool storage'
    ],
    includedServices: [
      { name: 'High-Speed WiFi', icon: <FaWifi className="text-xl" /> },
      { name: 'Reserved Parking', icon: <FaParking className="text-xl" /> },
      { name: 'Modern Equipment', icon: <FaChair className="text-xl" /> },
      { name: '24/7 Access', icon: <FaKey className="text-xl" /> },
      { name: 'Security System', icon: <FaLock className="text-xl" /> },
      { name: 'Weekly Cleaning', icon: <MdCleaningServices className="text-xl" /> },
      { name: 'Break Room Access', icon: <MdMeetingRoom className="text-xl" /> },
      { name: 'Eco-Friendly Building', icon: <FaLeaf className="text-xl" /> },
    ],
    images: [
      { url: 'https://picsum.photos/id/42/1200/800', alt: 'Standard suite main view' },
      { url: 'https://picsum.photos/id/334/1200/800', alt: 'Standard suite styling area' },
      { url: 'https://picsum.photos/id/342/1200/800', alt: 'Standard suite mirror wall' },
      { url: 'https://picsum.photos/id/360/1200/800', alt: 'Standard suite storage' },
    ],
    testimonials: [
      {
        name: 'Rachel Thompson',
        role: 'Hair Stylist',
        image: 'https://picsum.photos/id/45/200/200',
        text: 'This suite was perfect for me when I first went independent. The affordable price point helped me transition smoothly, and I was still able to provide a professional experience.'
      },
      {
        name: 'Marcus Johnson',
        role: 'Barber',
        image: 'https://picsum.photos/id/75/200/200',
        text: 'The standard suite has everything I need without the extras I wouldn&apos;t use. It&apos;s been the perfect size for my barbering business.'
      }
    ],
    features: [
      { name: 'Size', value: '175 sq ft', icon: <FaRuler className="text-xl text-purple-400" /> },
      { name: 'Monthly Rate', value: '$650', icon: <FaDollarSign className="text-xl text-purple-400" /> },
      { name: 'Availability', value: 'Immediate', icon: <FaClock className="text-xl text-purple-400" /> },
      { name: 'Location', value: 'Downtown', icon: <MdLocationOn className="text-xl text-purple-400" /> },
    ]
  },
  5: {
    id: 5,
    name: 'Barber Suite',
    description: 'Specially designed for the modern barber with vintage touches and practical features. This suite offers the perfect blend of traditional barbering atmosphere with contemporary amenities.',
    size: '190 sq ft',
    price: '$775/month',
    location: 'Downtown - 123 Main Street',
    availability: 'Available Now',
    leaseTerms: ['6-month minimum', '10% discount for annual lease', 'Utilities included', 'No commission fees'],
    amenities: [
      'Barber chair',
      'Sink with hot water',
      'Mirror wall',
      'Equipment storage',
      'Retail display',
      'Hot towel warmer',
      'Storage cabinets',
      'Product shelving'
    ],
    includedServices: [
      { name: 'High-Speed WiFi', icon: <FaWifi className="text-xl" /> },
      { name: 'Reserved Parking', icon: <FaParking className="text-xl" /> },
      { name: 'Modern Equipment', icon: <FaChair className="text-xl" /> },
      { name: '24/7 Access', icon: <FaKey className="text-xl" /> },
      { name: 'Security System', icon: <FaLock className="text-xl" /> },
      { name: 'Weekly Cleaning', icon: <MdCleaningServices className="text-xl" /> },
      { name: 'Break Room Access', icon: <MdMeetingRoom className="text-xl" /> },
      { name: 'Eco-Friendly Building', icon: <FaLeaf className="text-xl" /> },
    ],
    images: [
      { url: 'https://picsum.photos/id/372/1200/800', alt: 'Barber suite main view' },
      { url: 'https://picsum.photos/id/331/1200/800', alt: 'Barber suite chair' },
      { url: 'https://picsum.photos/id/368/1200/800', alt: 'Barber suite storage' },
      { url: 'https://picsum.photos/id/375/1200/800', alt: 'Barber suite sink area' },
    ],
    testimonials: [
      {
        name: 'James Wilson',
        role: 'Master Barber',
        image: 'https://picsum.photos/id/55/200/200',
        text: 'This suite perfectly captures the barbershop vibe my clients love while giving me the professional space to grow my business. The hot towel warmer is a client favorite.'
      },
      {
        name: 'Antonio Perez',
        role: 'Barber & Stylist',
        image: 'https://picsum.photos/id/87/200/200',
        text: 'The setup is perfect for barbering. I&apos;ve been able to offer premium services that weren&apos;t possible in my previous shop.'
      }
    ],
    features: [
      { name: 'Size', value: '190 sq ft', icon: <FaRuler className="text-xl text-purple-400" /> },
      { name: 'Monthly Rate', value: '$775', icon: <FaDollarSign className="text-xl text-purple-400" /> },
      { name: 'Availability', value: 'Immediate', icon: <FaClock className="text-xl text-purple-400" /> },
      { name: 'Location', value: 'Downtown', icon: <MdLocationOn className="text-xl text-purple-400" /> },
    ]
  },
  6: {
    id: 6,
    name: 'Deluxe Spa Room',
    description: 'Our most luxurious spa suite featuring private bathroom, premium finishes, and a serene atmosphere. Ideal for high-end spa services, this suite provides an unparalleled client experience.',
    size: '240 sq ft',
    price: '$950/month',
    location: 'Downtown - 123 Main Street',
    availability: 'Coming July 15',
    leaseTerms: ['6-month minimum', '10% discount for annual lease', 'Utilities included', 'No commission fees'],
    amenities: [
      'Private bathroom',
      'Soundproof walls',
      'Dimmer lighting',
      'Custom cabinetry',
      'Luxury treatment table',
      'Product display',
      'Hot stone warmer',
      'Mini refrigerator'
    ],
    includedServices: [
      { name: 'High-Speed WiFi', icon: <FaWifi className="text-xl" /> },
      { name: 'Reserved Parking', icon: <FaParking className="text-xl" /> },
      { name: 'Modern Equipment', icon: <FaChair className="text-xl" /> },
      { name: '24/7 Access', icon: <FaKey className="text-xl" /> },
      { name: 'Security System', icon: <FaLock className="text-xl" /> },
      { name: 'Weekly Cleaning', icon: <MdCleaningServices className="text-xl" /> },
      { name: 'Break Room Access', icon: <MdMeetingRoom className="text-xl" /> },
      { name: 'Eco-Friendly Building', icon: <FaLeaf className="text-xl" /> },
    ],
    images: [
      { url: 'https://picsum.photos/id/133/1200/800', alt: 'Deluxe spa main view' },
      { url: 'https://picsum.photos/id/160/1200/800', alt: 'Deluxe spa treatment area' },
      { url: 'https://picsum.photos/id/225/1200/800', alt: 'Deluxe spa private bathroom' },
      { url: 'https://picsum.photos/id/188/1200/800', alt: 'Deluxe spa storage' },
    ],
    testimonials: [
      {
        name: 'Sophia Williams',
        role: 'Spa Owner',
        image: 'https://picsum.photos/id/64/200/200',
        text: 'My clients rave about the experience in this suite. The private bathroom and soundproofing create the perfect luxury spa experience that allows me to charge premium rates.'
      },
      {
        name: 'Emma Davidson',
        role: 'Esthetician',
        image: 'https://picsum.photos/id/35/200/200',
        text: 'Having my own deluxe spa room has elevated my business to a whole new level. The privacy and amenities allow me to offer VIP treatments to my clients.'
      }
    ],
    features: [
      { name: 'Size', value: '240 sq ft', icon: <FaRuler className="text-xl text-purple-400" /> },
      { name: 'Monthly Rate', value: '$950', icon: <FaDollarSign className="text-xl text-purple-400" /> },
      { name: 'Availability', value: 'July 15', icon: <FaClock className="text-xl text-purple-400" /> },
      { name: 'Location', value: 'Downtown', icon: <MdLocationOn className="text-xl text-purple-400" /> },
    ]
  }
}
type SuiteDetailPageProps = {
  params: Promise<{
    id: string;
  }>; // params is now a Promise wrapping the object
};

export default function SuiteDetailPage({ params }: SuiteDetailPageProps) {
  // Use React.use() to unwrap the params Promise and get the synchronous value
  const resolvedParams = use(params);
  const suiteId = parseInt(resolvedParams.id); // Access the id after resolving the Promise
  const suite = suiteData[suiteId as keyof typeof suiteData];

  const router = useRouter(); // Initialize useRouter hook
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Handle non-existent suite
  if (!suite) {
    return (
      <div className="min-h-screen bg-[#2f2f38] text-white pt-24 px-4">
        <div className="max-w-6xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-6">Suite Not Found</h1>
          <p className="mb-8">The suite you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/suites" className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition">
            View All Suites
          </Link>
        </div>
      </div>
    )
  }

  // Redirect to apply page with suite info
  const handleApplyNow = () => {
    router.push(`/apply?suiteId=${suite.id}&suiteName=${encodeURIComponent(suite.name)}`)
  }

  return (
    <div className="min-h-screen bg-[#2f2f38] text-white pt-24 pb-20">
      {/* Back button */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <Link
          href="/suites"
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to all suites
        </Link>
      </div>

      {/* Hero section */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/5">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={suite.images[activeImageIndex].url}
                alt={suite.images[activeImageIndex].alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <MdPhotoLibrary className="text-white" />
                  <span className="text-sm">{activeImageIndex + 1} / {suite.images.length}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {suite.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImageIndex === index ? 'border-purple-500' : 'border-transparent'}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/5">
            <div className="bg-[#3a3a42] p-6 rounded-lg h-full">
              <div className="mb-8">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  suite.availability === 'Available Now' 
                    ? 'bg-green-500/20 text-green-400' 
                    : suite.availability === 'Waitlist'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {suite.availability}
                </div>
                <h1 className="text-3xl font-bold mb-2">{suite.name}</h1>
                <p className="text-gray-300 mb-4">{suite.location}</p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {suite.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      {feature.icon}
                      <div className="ml-3">
                        <p className="text-sm text-gray-400">{feature.name}</p>
                        <p className="font-medium">{feature.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-xl mb-3">Lease Terms</h3>
                <ul className="space-y-2">
                  {suite.leaseTerms.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span className="text-gray-300">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleApplyNow}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  Apply Now
                </motion.button>
                <Link
                  href={`/suites/tour?id=${suite.id}`}
                  className="w-full flex justify-center items-center bg-transparent border border-white hover:bg-white/10 text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  <FaRegCalendarAlt className="mr-2" /> Schedule Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-[#3a3a42] p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">About This Suite</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">{suite.description}</p>

          <h3 className="font-bold text-xl mb-4">Suite Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 mb-8">
            {suite.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <span className="text-purple-400 mr-2">✓</span>
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-xl mb-4">Included Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {suite.includedServices.map((service, index) => (
              <div key={index} className="flex flex-col items-center bg-[#2f2f38] p-4 rounded-lg">
                <div className="text-purple-400 mb-2">{service.icon}</div>
                <span className="text-center">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6">Suite Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {suite.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#3a3a42] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden relative mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-purple-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
              </div>
              <p className="text-gray-300 italic">&quot;{testimonial.text}&quot;</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-900 to-purple-600 p-8 md:p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make this suite yours?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step toward salon ownership and independence. Apply now to secure this suite before it&apos;s gone!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleApplyNow}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              Apply Now
            </motion.button>
            <Link
              href="/suites"
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              View Other Suites
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
