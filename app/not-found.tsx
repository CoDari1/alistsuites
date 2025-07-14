'use client';

import { Suspense } from 'react';
import Link from 'next/link';

function NotFoundContent() {
    return (
        <div className="min-h-screen bg-[#2f2f38] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
                <p className="text-gray-400 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been removed. Try checking the URL for typos or use the navigation above.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}

export default function NotFound() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotFoundContent />
        </Suspense>
    );
}