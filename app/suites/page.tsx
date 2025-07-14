'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'

// Mock data for suites - replace with actual data from your API
const suites = [
  {
    id: 1,
    name: 'Luxury Ocean Suite',
    price: 299,
    size: 65, // in m²
    capacity: 2,
    amenities: ['Ocean view', 'King bed', 'Jacuzzi', 'Mini bar'],
    imageUrl: '/images/suites/luxury-ocean.jpg',
    description: 'Experience luxury with breathtaking ocean views and premium amenities.'
  },
  {
    id: 2,
    name: 'Executive Suite',
    price: 349,
    size: 80,
    capacity: 4,
    amenities: ['City view', 'King bed', 'Living room', 'Work desk'],
    imageUrl: '/images/suites/executive.jpg',
    description: 'Perfect for business travelers with spacious work area and luxurious comfort.'
  },
  {
    id: 3,
    name: 'Family Suite',
    price: 399,
    size: 95,
    capacity: 6,
    amenities: ['Two bedrooms', 'Kitchen', 'Living area', 'Children amenities'],
    imageUrl: '/images/suites/family.jpg',
    description: 'Spacious accommodation for the whole family with separate bedrooms and living spaces.'
  },
  {
    id: 4,
    name: 'Presidential Suite',
    price: 599,
    size: 120,
    capacity: 4,
    amenities: ['Panoramic view', 'Private balcony', 'Butler service', 'Dining area'],
    imageUrl: '/images/suites/presidential.jpg',
    description: 'Our most exclusive accommodation featuring premium services and spectacular views.'
  },
];

const SuitesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');

  // Filter suites based on search and filters
  const filteredSuites = suites.filter(suite => {
    // Search filter
    const matchesSearch = suite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suite.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Price filter
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'under300' && suite.price < 300) ||
                        (priceFilter === '300to400' && suite.price >= 300 && suite.price <= 400) ||
                        (priceFilter === 'over400' && suite.price > 400);

    // Capacity filter
    const matchesCapacity = capacityFilter === 'all' ||
                           (capacityFilter === '1-2' && suite.capacity <= 2) ||
                           (capacityFilter === '3-4' && suite.capacity > 2 && suite.capacity <= 4) ||
                           (capacityFilter === '5+' && suite.capacity >= 5);

    return matchesSearch && matchesPrice && matchesCapacity;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Luxury Suites</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover our collection of premium suites designed for your comfort and relaxation.
        Each suite offers unique features and amenities to make your stay unforgettable.
      </p>

      {/* Search and Filters */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search suites..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-md py-2 px-4"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under300">Under $300</option>
                <option value="300to400">$300 - $400</option>
                <option value="over400">Over $400</option>
              </select>
            </div>

            <select
              className="border border-gray-300 rounded-md py-2 px-4"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
            >
              <option value="all">All Capacities</option>
              <option value="1-2">1-2 Guests</option>
              <option value="3-4">3-4 Guests</option>
              <option value="5+">5+ Guests</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Showing {filteredSuites.length} of {suites.length} suites
        </div>
      </div>

      {/* Suites Grid */}
      {filteredSuites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuites.map((suite) => (
            <div key={suite.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <Image
                  src={suite.imageUrl}
                  alt={suite.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={suite.id <= 4}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/suite-placeholder.jpg";
                  }}
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{suite.name}</h3>
                  <p className="text-lg font-bold text-emerald-600">${suite.price}<span className="text-sm font-normal text-gray-500">/night</span></p>
                </div>

                <p className="text-gray-600 mb-4">{suite.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm">
                    {suite.size}m² • {suite.capacity} {suite.capacity > 1 ? 'guests' : 'guest'}
                  </span>
                  {suite.amenities.slice(0, 2).map((amenity, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                  {suite.amenities.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      +{suite.amenities.length - 2} more
                    </span>
                  )}
                </div>

                <Link href={`/suites/${suite.id}`}>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No suites found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setPriceFilter('all');
              setCapacityFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default SuitesPage
