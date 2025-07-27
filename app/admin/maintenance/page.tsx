"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function AdminMaintenancePage() {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [maintenance, setMaintenance] = useState<any[]>([]);
    const [maintenanceLoading, setMaintenanceLoading] = useState(true);

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setAuthorized(false);
                return;
            }
            const { data } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single();
            setAuthorized(data?.role === 'ADMIN');
        }
        void checkAdmin();
    }, []);

    useEffect(() => {
        async function fetchMaintenance() {
            setMaintenanceLoading(true);
            const { data, error } = await supabase
                .from('maintenance_requests')
                .select('id, tenant_id, suite_id, description, status, created_at, resolved_at')
                .order('created_at', { ascending: false });
            setMaintenance(data || []);
            setMaintenanceLoading(false);
        }
        if (authorized) void fetchMaintenance();
    }, [authorized]);

    async function updateStatus(id: string, status: string) {
        await supabase.from('maintenance_requests').update({ status, resolved_at: status === 'RESOLVED' ? new Date().toISOString() : null }).eq('id', id);
        setMaintenance((prev) => prev.map((req) => req.id === id ? { ...req, status, resolved_at: status === 'RESOLVED' ? new Date().toISOString() : null } : req));
    }

    if (authorized === null) {
        return <div className="text-white">Loading...</div>;
    }
    if (!authorized) {
        return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#2f2f38] text-white">
            Unauthorized access: You must be an admin to view this page.
        </div>;
    }

    return (
        <div className="min-h-screen w-full bg-[#181820] flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-400 drop-shadow">Maintenance Requests</h1>
                <div className="bg-[#23232b] p-8 rounded-2xl shadow-xl border border-purple-900/30">
                    {maintenanceLoading ? (
                        <div className="text-purple-200">Loading...</div>
                    ) : maintenance.length === 0 ? (
                        <div className="text-gray-400">No maintenance requests found.</div>
                    ) : (
                        <div className="overflow-x-auto rounded-xl" style={{ scrollbarColor: '#6d28d9 #23232b', scrollbarWidth: 'thin' }}>
                            <table className="min-w-full divide-y divide-purple-900/30 text-base">
                                <thead className="bg-[#23232b]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Tenant</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Suite</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Created</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#181820] divide-y divide-purple-900/30">
                                    {maintenance.map((req) => (
                                        <tr key={req.id} className="hover:bg-purple-900/10 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-purple-200 font-semibold">{req.tenant_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-purple-200 font-semibold">{req.suite_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-gray-100" title={req.description}>{req.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={
                                                    req.status === 'OPEN' ? 'text-yellow-400 font-bold' :
                                                    req.status === 'IN_PROGRESS' ? 'text-blue-400 font-bold' :
                                                    req.status === 'RESOLVED' ? 'text-green-400 font-bold' : 'text-gray-400'
                                                }>{req.status}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">{new Date(req.created_at).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                                {req.status !== 'RESOLVED' && (
                                                    <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded shadow" onClick={() => updateStatus(req.id, req.status === 'OPEN' ? 'IN_PROGRESS' : 'RESOLVED')}>
                                                        {req.status === 'OPEN' ? 'Mark In Progress' : 'Mark Resolved'}
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
