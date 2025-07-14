'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaWifi, FaParking, FaChair, FaLeaf, FaKey, FaLock } from 'react-icons/fa'
import { MdCleaningServices, MdMeetingRoom } from 'react-icons/md'

const featuredSuites = [
	{
		id: 1,
		name: 'Premium Styling Suite',
		size: '200 sq ft',
		price: '$800/month',
		amenities: [
			'Private entrance',
			'Built-in storage',
			'Shampoo station',
			'Premium lighting',
		],
		image: 'https://picsum.photos/id/238/800/600',
		availability: 'Available Now',
	},
	{
		id: 2,
		name: 'Deluxe Nail Studio',
		size: '180 sq ft',
		price: '$750/month',
		amenities: [
			'Ventilation system',
			'Manicure table',
			'Pedicure chair',
			'Product display',
		],
		image: 'https://picsum.photos/id/177/800/600',
		availability: 'Available June 1',
	},
	{
		id: 3,
		name: 'Spa Treatment Room',
		size: '220 sq ft',
		price: '$900/month',
		amenities: [
			'Sound insulation',
			'Sink',
			'Storage cabinets',
			'Adjustable lighting',
		],
		image: 'https://picsum.photos/id/265/800/600',
		availability: 'Waitlist',
	},
	{
		id: 4,
		name: 'Standard Styling Suite',
		size: '175 sq ft',
		price: '$650/month',
		amenities: [
			'Styling chair',
			'Mirror',
			'Basic storage',
			'Shared shampoo area',
		],
		image: 'https://picsum.photos/id/42/800/600',
		availability: 'Available Now',
	},
	{
		id: 5,
		name: 'Barber Suite',
		size: '190 sq ft',
		price: '$775/month',
		amenities: [
			'Barber chair',
			'Sink with hot water',
			'Mirror wall',
			'Equipment storage',
		],
		image: 'https://picsum.photos/id/372/800/600',
		availability: 'Available Now',
	},
	{
		id: 6,
		name: 'Deluxe Spa Room',
		size: '240 sq ft',
		price: '$950/month',
		amenities: [
			'Private bathroom',
			'Soundproof walls',
			'Dimmer lighting',
			'Custom cabinetry',
		],
		image: 'https://picsum.photos/id/133/800/600',
		availability: 'Coming July 15',
	},
]

const amenities = [
	{ name: 'Free Wi-Fi', icon: <FaWifi className="text-2xl" /> },
	{ name: 'Ample Parking', icon: <FaParking className="text-2xl" /> },
	{ name: 'Modern Equipment', icon: <FaChair className="text-2xl" /> },
	{ name: '24/7 Access', icon: <FaKey className="text-2xl" /> },
	{ name: 'Security System', icon: <FaLock className="text-2xl" /> },
	{ name: 'Cleaning Service', icon: <MdCleaningServices className="text-2xl" /> },
	{ name: 'Break Room', icon: <MdMeetingRoom className="text-2xl" /> },
	{ name: 'Eco-Friendly', icon: <FaLeaf className="text-2xl" /> },
]

export default function Suites() {
	const [filter, setFilter] = useState('all')

	return (
		<div className="min-h-screen bg-[#2f2f38] text-white">
			{/* Hero section */}
			<div className="relative h-[60vh] w-full">
				<Image
					src="https://picsum.photos/id/175/1920/1080"
					alt="A-List Salon Suites"
					fill
					style={{ objectFit: 'cover' }}
					priority
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
					<motion.h1
						className="text-5xl md:text-6xl font-bold mb-4 text-center"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						A-List Salon Suites
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl text-center max-w-2xl"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Where Beauty Professionals Build Their Empire
					</motion.p>
				</div>
			</div>

			{/* About our suites */}
			<section className="py-20 px-4 max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6 text-white">
						Elevate Your Career
					</h2>
					<p className="max-w-3xl mx-auto text-gray-300 text-lg">
						At A-List Salon Suites, we believe in empowering beauty professionals
						to take control of their careers. Our luxury suites are designed to
						provide the perfect environment for your business to thrive with no
						commission fees and complete creative freedom.
					</p>
				</div>

				{/* Suite amenities */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
					{amenities.map((amenity, index) => (
						<motion.div
							key={index}
							className="bg-[#4a4a4f] p-6 rounded-xl shadow-lg text-center"
							whileHover={{
								y: -5,
								boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
							}}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<div className="flex justify-center mb-3 text-purple-400">
								{amenity.icon}
							</div>
							<h3 className="font-semibold text-white">{amenity.name}</h3>
						</motion.div>
					))}
				</div>

				{/* Available suites */}
				<div className="mb-16">
					<h2 className="text-4xl font-bold mb-10 text-center text-white">
						Find Your Perfect Suite
					</h2>

					{/* Filter options */}
					<div className="flex justify-center mb-10">
						<div className="flex space-x-2 bg-[#3a3a42] p-1 rounded-lg">
							<button
								onClick={() => setFilter('all')}
								className={`px-5 py-2 rounded-md transition font-medium ${
									filter === 'all'
										? 'bg-purple-600 text-white'
										: 'hover:bg-[#4a4a4f] text-gray-300'
								}`}
							>
								All Suites
							</button>
							<button
								onClick={() => setFilter('available')}
								className={`px-5 py-2 rounded-md transition font-medium ${
									filter === 'available'
										? 'bg-purple-600 text-white'
										: 'hover:bg-[#4a4a4f] text-gray-300'
								}`}
							>
								Available Now
							</button>
							<button
								onClick={() => setFilter('coming')}
								className={`px-5 py-2 rounded-md transition font-medium ${
									filter === 'coming'
										? 'bg-purple-600 text-white'
										: 'hover:bg-[#4a4a4f] text-gray-300'
								}`}
							>
								Coming Soon
							</button>
						</div>
					</div>

					{/* Suite listings */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{featuredSuites
							.filter(suite => {
								if (filter === 'all') return true
								if (filter === 'available')
									return suite.availability === 'Available Now'
								if (filter === 'coming')
									return (
										suite.availability !== 'Available Now' &&
										suite.availability !== 'Waitlist'
									)
								return true
							})
							.map(suite => (
								<motion.div
									key={suite.id}
									className="bg-[#3a3a42] rounded-xl overflow-hidden shadow-xl hover:transform hover:scale-[1.02] transition-transform duration-300"
									whileHover={{ y: -5 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
								>
									<div className="relative h-64 w-full">
										<Image
											src={suite.image}
											alt={suite.name}
											fill
											style={{ objectFit: 'cover' }}
										/>
										<div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
											{suite.availability}
										</div>
									</div>
									<div className="p-7">
										<h3 className="text-xl font-bold mb-3 text-white">
											{suite.name}
										</h3>
										<div className="flex justify-between mb-4">
											<span className="text-gray-300">{suite.size}</span>
											<span className="font-semibold text-purple-400">
												{suite.price}
											</span>
										</div>
										<div className="mb-5">
											<h4 className="font-medium mb-3 text-white">
												Suite Features:
											</h4>
											<ul className="grid grid-cols-2 gap-x-2 gap-y-2">
												{suite.amenities.map((amenity, index) => (
													<li
														key={index}
														className="text-sm text-gray-300 flex items-center"
													>
														<span className="mr-2 text-purple-400">✓</span> {amenity}
													</li>
												))}
											</ul>
										</div>
										<button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition mt-4 font-medium">
											{suite.availability === 'Available Now'
												? 'Schedule Tour'
												: 'Join Waitlist'}
										</button>
									</div>
								</motion.div>
							))}
					</div>
				</div>
			</section>

			{/* Our Locations Section - New */}
			<section className="py-16 px-4 bg-[#3a3a42]">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold mb-12 text-center text-white">
						Our Locations
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="relative h-80 rounded-xl overflow-hidden">
							<Image
								src="https://picsum.photos/id/1031/800/600"
								alt="Downtown Location"
								fill
								style={{ objectFit: 'cover' }}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
								<h3 className="text-2xl font-bold mb-2">Downtown</h3>
								<p className="text-gray-300 mb-3">
									123 Main Street, Suite 100
								</p>
								<button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-max transition">
									View Location
								</button>
							</div>
						</div>
						<div className="relative h-80 rounded-xl overflow-hidden">
							<Image
								src="https://picsum.photos/id/1048/800/600"
								alt="Westside Location"
								fill
								style={{ objectFit: 'cover' }}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
								<h3 className="text-2xl font-bold mb-2">Westside</h3>
								<p className="text-gray-300 mb-3">
									456 Fashion Avenue, Suite 200
								</p>
								<button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-max transition">
									View Location
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Call to action */}
			<section className="bg-gradient-to-r from-purple-900 to-purple-600 py-20 px-4">
				<div className="max-w-5xl mx-auto text-center text-white">
					<h2 className="text-4xl font-bold mb-6">Ready to Join the A-List?</h2>
					<p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
						Take the first step toward salon suite ownership and independence. Our
						team is ready to help you find the perfect space for your beauty
						business.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-5">
						<button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg">
							Book Your Tour
						</button>
						<button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition">
							Explore Pricing
						</button>
					</div>
				</div>
			</section>

			{/* Gallery Section - New */}
			<section className="py-20 px-4 max-w-7xl mx-auto">
				<h2 className="text-4xl font-bold mb-12 text-center text-white">
					Suite Gallery
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{[420, 326, 287, 473, 169, 334, 338, 349].map((id, index) => (
						<div
							key={index}
							className={`rounded-xl overflow-hidden ${
								index === 0 || index === 7 ? 'col-span-2 row-span-2' : ''
							}`}
						>
							<div className="relative h-full min-h-[200px]">
								<Image
									src={`https://picsum.photos/id/${id}/800/800`}
									alt={`Gallery image ${index + 1}`}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20 px-4 max-w-6xl mx-auto bg-[#2f2f38]">
				<h2 className="text-4xl font-bold mb-12 text-center text-white">
					Success Stories
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="bg-[#3a3a42] p-8 rounded-xl shadow-lg">
						<div className="flex items-center mb-4">
							<div className="w-14 h-14 rounded-full bg-purple-900 flex items-center justify-center text-white font-bold text-xl mr-4">
								JM
							</div>
							<div>
								<h3 className="font-bold text-white">Jessica Miller</h3>
								<p className="text-gray-300">Hair Stylist, 2 years at A-List</p>
							</div>
						</div>
						<p className="text-gray-300 italic">
							&quot;Moving my salon business to A-List was the best decision I&apos;ve
							made professionally. My income increased by 40% in the first year, and
							I love the freedom to create my own schedule and environment.&quot;
						</p>
					</div>
					<div className="bg-[#3a3a42] p-8 rounded-xl shadow-lg">
						<div className="flex items-center mb-4">
							<div className="w-14 h-14 rounded-full bg-purple-900 flex items-center justify-center text-white font-bold text-xl mr-4">
								RT
							</div>
							<div>
								<h3 className="font-bold text-white">Robert Taylor</h3>
								<p className="text-gray-300">Barber, 1 year at A-List</p>
							</div>
						</div>
						<p className="text-gray-300 italic">
							&quot;The professional environment and prime location have helped me build
							my clientele faster than I expected. The community of other beauty pros
							has been an unexpected bonus - we refer clients to each other all the
							time.&quot;
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-20 px-4 max-w-4xl mx-auto bg-[#4a4a4f]">
				<h2 className="text-4xl font-bold mb-12 text-center text-white">
					Common Questions
				</h2>
				<div className="space-y-6">
					<div className="bg-[#3a3a42] p-7 rounded-xl shadow-lg">
						<h3 className="text-xl font-semibold mb-3 text-white">
							What&apos;s included in the monthly rent?
						</h3>
						<p className="text-gray-300">
							Your monthly rent includes utilities, WiFi, 24/7 building access,
							security, common area maintenance, and use of the break room. Each
							suite also comes with basic fixtures.
						</p>
					</div>
					<div className="bg-[#3a3a42] p-7 rounded-xl shadow-lg">
						<h3 className="text-xl font-semibold mb-3 text-white">
							Is there a minimum lease term?
						</h3>
						<p className="text-gray-300">
							Our standard lease terms are 6 or 12 months, with discounts
							available for longer commitments. We occasionally offer short-term
							options based on availability.
						</p>
					</div>
					<div className="bg-[#3a3a42] p-7 rounded-xl shadow-lg">
						<h3 className="text-xl font-semibold mb-3 text-white">
							Can I customize my suite?
						</h3>
						<p className="text-gray-300">
							Yes! We encourage you to make your suite your own. Paint colors,
							décor, and minor modifications are welcome with approval. Major
							renovations require discussion.
						</p>
					</div>
					<div className="bg-[#3a3a42] p-7 rounded-xl shadow-lg">
						<h3 className="text-xl font-semibold mb-3 text-white">
							Are product sales allowed?
						</h3>
						<p className="text-gray-300">
							Absolutely. You&apos;re free to sell retail products related to your
							services directly from your suite. This is a great way to increase
							your revenue.
						</p>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="bg-[#2f2f38] text-white py-16 px-4 border-t border-gray-800">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-6">
						Start Your A-List Journey Today
					</h2>
					<p className="mb-8 text-gray-300">
						Contact us to schedule a tour and see why beauty professionals choose
						A-List Salon Suites.
					</p>
					<button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-lg font-medium transition">
						Contact Us
					</button>
				</div>
			</section>
		</div>
	)
}
