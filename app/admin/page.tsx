'use client';

import React, { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase/client';

const isUserAdmin = async (userId: string): Promise<boolean> => {
    if (!userId) {
        console.error('No userId provided');
        return false;
    }
    const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user role:', error);
        return false;
    }
    return data?.role === 'admin';
}

const Page = () => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

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

    if (authorized === null) {
        return <div className="text-white">Loading...</div>;
    }

    if (!authorized) {
        return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#2f2f38] text-white">
            Unauthorized access: You must be an admin to view this page.
        </div>;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#2f2f38]">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
                <p className="text-gray-300 mb-6">Welcome to the admin dashboard. Here you can manage your application settings.</p>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Manage Users</li>
                        <li>View Analytics</li>
                        <li>Configure Settings</li>
                        <li>Access Logs</li>
                    </ul>
                    <p className="mt-4 text-gray-500">For more information, please refer to the documentation or contact support.</p>
                </div>
            </div>
        </div>
    );
};

export default Page;