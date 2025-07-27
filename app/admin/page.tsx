'use client';

import React, { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase/client';

const isUserAdmin = async (userId: string): Promise<boolean> => {
    if (!userId) {
        console.error('No userId provided');
        return false;
    }
    const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user role:', error);
        return false;
    }
    return data?.role === 'ADMIN';
}

const Page = () => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [stats, setStats] = useState({ tenants: 0, suites: 0, tenancies: 0 });

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setAuthorized(false);
                return;
            }
            const isAdmin = await isUserAdmin(user.id);
            setAuthorized(isAdmin);
        }
        checkAdmin();
    }, []);

    useEffect(() => {
        async function fetchStats() {
            const [{ count: tenants }, { count: suites }, { count: tenancies }] = await Promise.all([
                supabase.from('users').select('id', { count: 'exact', head: true }),
                supabase.from('suites').select('id', { count: 'exact', head: true }),
                supabase.from('tenancies').select('id', { count: 'exact', head: true }).eq('active', true),
            ]);
            setStats({ tenants: tenants || 0, suites: suites || 0, tenancies: tenancies || 0 });
        }
        if (authorized) fetchStats();
    }, [authorized]);

    if (authorized === null) {
        return <div className="text-white">Loading...</div>;
    }

    if (!authorized) {
        return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#2f2f38] text-white">
            Unauthorized access: You must be an admin to view this page.
        </div>;
    }

    return (
        <div className="fixed inset-0 min-h-screen w-full bg-[#181820] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#23232b] border-r border-purple-900/30 flex-shrink-0 flex flex-col h-full z-40">
                <div className="flex items-center justify-center h-20 px-6 border-b border-purple-900/30">
                    <span className="text-xl font-extrabold text-purple-400 tracking-wide">Admin</span>
                </div>
                <nav className="flex flex-col gap-2 mt-8 px-4">
                    <a href="/admin" className="px-4 py-2 rounded-lg text-purple-200 bg-purple-900/30 font-semibold mb-1">Dashboard</a>
                    <a href="/admin/tenants" className="px-4 py-2 rounded-lg text-gray-400 hover:bg-purple-900/20 hover:text-purple-200 transition">Tenants</a>
                    <a href="/admin/suites" className="px-4 py-2 rounded-lg text-gray-400 hover:bg-purple-900/20 hover:text-purple-200 transition">Suites</a>
                    <a href="/admin/maintenance" className="px-4 py-2 rounded-lg text-gray-400 hover:bg-purple-900/20 hover:text-purple-200 transition">Maintenance</a>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-start w-full min-h-screen overflow-y-auto">
                <div className="w-full max-w-6xl mt-10 mb-20 px-2">
                    <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-400 drop-shadow">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-[#23232b] rounded-xl shadow p-6 border border-purple-900/30 flex flex-col items-center">
                            <span className="text-4xl font-bold text-purple-300">{stats.tenants}</span>
                            <span className="text-gray-400 mt-2">Tenants</span>
                        </div>
                        <div className="bg-[#23232b] rounded-xl shadow p-6 border border-purple-900/30 flex flex-col items-center">
                            <span className="text-4xl font-bold text-purple-300">{stats.suites}</span>
                            <span className="text-gray-400 mt-2">Suites</span>
                        </div>
                        <div className="bg-[#23232b] rounded-xl shadow p-6 border border-purple-900/30 flex flex-col items-center">
                            <span className="text-4xl font-bold text-purple-300">{stats.tenancies}</span>
                            <span className="text-gray-400 mt-2">Active Tenancies</span>
                        </div>
                    </div>
                    <div className="bg-[#23232b] p-8 rounded-xl shadow border border-purple-900/30">
                        <h2 className="text-xl font-semibold mb-4 text-purple-300">Admin Actions</h2>
                        <ul className="list-disc list-inside text-gray-400 mb-4">
                            <li>Manage Tenants and Suites</li>
                            <li>View Analytics (coming soon)</li>
                            <li>Configure Settings (coming soon)</li>
                            <li>Access Logs (coming soon)</li>
                        </ul>
                        <p className="mt-4 text-gray-500">For more information, please refer to the documentation or contact support.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;