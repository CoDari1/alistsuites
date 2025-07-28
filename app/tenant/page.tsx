'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';

export default function TenantPage() {
    const [loading, setLoading] = useState(true);
    const [tenant, setTenant] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchTenant() {
            setLoading(true);
            setError("");
            // Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                console.log("[Tenant Dashboard] No user or error:", userError, user);
                setError("You must be logged in to view your dashboard.");
                setLoading(false);
                return;
            }
            console.log("[Tenant Dashboard] Logged in user:", user.id);
            // Fetch tenancy record by tenant_id (user.id)
            const { data, error: tenancyError } = await supabase
                .from('tenancies')
                .select('*')
                .eq('tenant_id', user.id)
                .eq('active', true)
                .single();
            if (tenancyError || !data) {
                if (tenancyError?.code === 'PGRST116') {
                    console.log("[Tenant Dashboard] No active tenancy found for user:", user.id, tenancyError);
                } else if (tenancyError) {
                    console.log("[Tenant Dashboard] Error fetching tenancy for user:", user.id, tenancyError);
                }
                setError("No active tenancy found. You may not have a suite assigned yet.");
                setLoading(false);
                return;
            }
            // Fetch suite to ensure it exists
            if (!data.suite_id) {
                console.log("[Tenant Dashboard] No suite_id in tenancy for user:", user.id, data);
                setError("No suite assigned to your tenancy. Please contact management.");
                setLoading(false);
                return;
            }
            const { data: suite, error: suiteError } = await supabase
                .from('suites')
                .select('id')
                .eq('id', data.suite_id)
                .single();
            if (suiteError || !suite) {
                console.log("[Tenant Dashboard] Suite not found for suite_id:", data.suite_id, suiteError);
                setError("Your assigned suite no longer exists. Please contact management.");
                setLoading(false);
                return;
            }
            console.log("[Tenant Dashboard] Found active tenancy and suite for user:", user.id, data, suite);
            setTenant(data);
            setLoading(false);
        }
        fetchTenant();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">Loading...</div>;
    }
    if (error) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-950 text-red-400">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-[#181820] text-gray-100 flex flex-col items-center py-6 sm:py-12 px-2 sm:px-4">
            <div className="w-full max-w-lg sm:max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 text-purple-300 text-center drop-shadow">Tenant Dashboard</h1>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-300 text-center">Welcome to your dashboard. Here you can manage maintenance requests and view your suite details.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                    {/* Suite Details Card */}
                    <div className="bg-[#23232b] rounded-2xl shadow-lg p-5 sm:p-8 flex flex-col items-start border border-purple-900/30 w-full">
                        <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-200 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Your Suite
                        </h2>
                        {tenant.suite_id ? (
                            <>
                                <div className="mb-1 sm:mb-2"><span className="font-semibold text-purple-300">Suite ID:</span> {tenant.suite_id}</div>
                                <div className="mb-1 sm:mb-2"><span className="font-semibold text-purple-300">Lease Start:</span> {tenant.start_date || '-'}</div>
                                <div className="mb-1 sm:mb-2"><span className="font-semibold text-purple-300">Lease End:</span> {tenant.end_date || 'N/A'}</div>
                                <div className="mb-1 sm:mb-2"><span className="font-semibold text-purple-300">Status:</span> <span className="text-green-400">Active</span></div>
                            </>
                        ) : (
                            <div className="text-gray-400">No suite assigned yet.</div>
                        )}
                    </div>
                    {/* Maintenance Card */}
                    <div className="bg-[#23232b] rounded-2xl shadow-lg p-5 sm:p-8 flex flex-col items-start border border-purple-900/30 w-full">
                        <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-200 flex items-center gap-2">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17.25v.008h.008v-.008H9.75zm4.5 0v.008h.008v-.008h-.008zm-7.5-2.25a2.25 2.25 0 012.25-2.25h7.5a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-2.25zm2.25-6.75V6.75A2.25 2.25 0 0111.25 4.5h1.5A2.25 2.25 0 0115 6.75v1.5"></path></svg>
                            Maintenance
                        </h2>
                        {tenant.suite_id ? (
                            <a
                                href={`/tenant/maintenance?tenantId=${tenant.id}&suiteId=${tenant.suite_id}`}
                                className="inline-block mt-2 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow transition"
                            >
                                Request Maintenance
                            </a>
                        ) : (
                            <div className="text-gray-400">You do not have a suite assigned yet. Please contact management if you believe this is an error.</div>
                        )}
                    </div>
                </div>
                {/* Lease Actions Card */}
                <div className="bg-[#23232b] rounded-2xl shadow-lg p-5 sm:p-8 flex flex-col items-start border border-purple-900/30 w-full">
                    <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-200 flex items-center gap-2">
                        Lease Agreement
                    </h2>
                    <a
                        href="/Salon-Booth-Rental-Agreement-Form.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mb-3 bg-white text-purple-700 font-semibold px-4 py-2 rounded hover:bg-purple-100 transition"
                    >
                        View Lease
                    </a>
                    <button
                        className="inline-block bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold px-4 py-2 rounded shadow transition"
                        onClick={() => alert('Signature workflow coming soon!')}
                    >
                        Sign Lease
                    </button>
                </div>
            </div>
        </div>
    );
}