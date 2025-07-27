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
                setError("You must be logged in to view your dashboard.");
                setLoading(false);
                return;
            }
            // Fetch tenancy record by tenant_id (user.id)
            const { data, error: tenancyError } = await supabase
                .from('tenancies')
                .select('*')
                .eq('tenant_id', user.id)
                .eq('active', true)
                .single();
            if (tenancyError || !data) {
                setError("No active tenancy found. You may not have a suite assigned yet.");
                setLoading(false);
                return;
            }
            // Fetch suite to ensure it exists
            if (!data.suite_id) {
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
                setError("Your assigned suite no longer exists. Please contact management.");
                setLoading(false);
                return;
            }
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
        <div className="min-h-screen bg-[#181820] text-gray-100 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-2 text-purple-300 text-center drop-shadow">Tenant Dashboard</h1>
                <p className="text-lg mb-8 text-gray-300 text-center">Welcome to your dashboard. Here you can manage maintenance requests and view your suite details.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Suite Details Card */}
                    <div className="bg-[#23232b] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-purple-900/30">
                        <h2 className="text-2xl font-bold mb-4 text-purple-200 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Your Suite
                        </h2>
                        {tenant.suite_id ? (
                            <>
                                <div className="mb-2"><span className="font-semibold text-purple-300">Suite ID:</span> {tenant.suite_id}</div>
                                <div className="mb-2"><span className="font-semibold text-purple-300">Lease Start:</span> {tenant.start_date || '-'}</div>
                                <div className="mb-2"><span className="font-semibold text-purple-300">Lease End:</span> {tenant.end_date || 'N/A'}</div>
                                <div className="mb-2"><span className="font-semibold text-purple-300">Status:</span> <span className="text-green-400">Active</span></div>
                            </>
                        ) : (
                            <div className="text-gray-400">No suite assigned yet.</div>
                        )}
                    </div>
                    {/* Maintenance Card */}
                    <div className="bg-[#23232b] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-purple-900/30">
                        <h2 className="text-2xl font-bold mb-4 text-purple-200 flex items-center gap-2">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17.25v.008h.008v-.008H9.75zm4.5 0v.008h.008v-.008h-.008zm-7.5-2.25a2.25 2.25 0 012.25-2.25h7.5a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-2.25zm2.25-6.75V6.75A2.25 2.25 0 0111.25 4.5h1.5A2.25 2.25 0 0115 6.75v1.5"></path></svg>
                            Maintenance
                        </h2>
                        {tenant.suite_id ? (
                            <a
                                href={`/tenant/maintenance?tenantId=${tenant.id}&suiteId=${tenant.suite_id}`}
                                className="inline-block mt-2 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold px-6 py-2 rounded-lg shadow transition"
                            >
                                Request Maintenance
                            </a>
                        ) : (
                            <div className="text-gray-400">You do not have a suite assigned yet. Please contact management if you believe this is an error.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}