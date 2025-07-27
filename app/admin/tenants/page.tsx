'use client';
import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Tenant = {
    id: string;
    email: string;
    name?: string;
    created_at?: string;
};

type Tenancy = {
    id: string;
    tenant_id: string;
    suite_id: string;
    active?: boolean;
    end_date?: string | null;
};

type Suite = {
    id: string;
    suite_number: string;
    price_monthly?: number;
};

export default function TenantPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [tenancies, setTenancies] = useState<Tenancy[]>([]);
    const [suites, setSuites] = useState<Suite[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({email: "", name: ""});
    const [error, setError] = useState<string | null>(null);
    // Add suite assignment state
    const [assignments, setAssignments] = useState<{[tenantId: string]: string}>({});
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const {data: tenantsData} = await supabase.from("users").select("id, email, name, created_at");
            const {data: tenanciesData} = await supabase
                .from("tenancies")
                .select("id, tenant_id, suite_id, active, end_date")
                .eq("active", true);
            const {data: suitesData} = await supabase.from("suites").select("id, suite_number, price_monthly");
            setTenants(tenantsData || []);
            setTenancies(tenanciesData || []);
            setSuites(suitesData || []);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const addTenant = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!form.email) {
            setError("Email is required.");
            return;
        }
        const {data, error} = await supabase
            .from("users")
            .insert([{email: form.email, name: form.name}])
            .select();
        if (error) {
            setError(error.message);
        } else if (data && data.length > 0) {
            setTenants((prev) => [...prev, data[0]]);
            setForm({email: "", name: ""});
        }
    };

    const removeTenant = async (id: string) => {
        setError(null);
        const {error} = await supabase.from("users").delete().eq("id", id);
        if (error) {
            setError(error.message);
        } else {
            setTenants((prev) => prev.filter((tenant) => tenant.id !== id));
        }
    };

    // Helper to get suite info for a tenant
    const getSuiteInfo = (tenantId: string) => {
        const tenancy = tenancies.find(
            t => t.tenant_id === tenantId && t.active && (!t.end_date || new Date(t.end_date) > new Date())
        );
        if (!tenancy) return {suiteNumber: "-", price: "-"};
        const suite = suites.find(s => s.id === tenancy.suite_id);
        return {
            suiteNumber: suite?.suite_number ?? "-",
            price: suite?.price_monthly?.toFixed(2) ?? "-"
        };
    };

    // Helper to get current suite assignment
    const getCurrentSuiteId = (tenantId: string) => {
        const tenancy = tenancies.find(t => t.tenant_id === tenantId && t.active);
        return tenancy?.suite_id || "";
    };

    // Handle suite selection change
    const handleSuiteChange = (tenantId: string, suiteId: string) => {
        setAssignments(prev => ({ ...prev, [tenantId]: suiteId }));
    };

    // Assign suite to tenant (create or update tenancy)
    const handleAssignSuite = async (tenantId: string) => {
        const suiteId = assignments[tenantId];
        if (!suiteId) return;
        setSaving(tenantId);
        // End any existing active tenancy for this tenant
        const existing = tenancies.find(t => t.tenant_id === tenantId && t.active);
        if (existing) {
            await supabase
                .from('tenancies')
                .update({ active: false, end_date: new Date().toISOString().slice(0,10) })
                .eq('id', existing.id);
        }
        // Create new tenancy
        const { error } = await supabase
            .from('tenancies')
            .insert({
                tenant_id: tenantId,
                suite_id: suiteId,
                start_date: new Date().toISOString().slice(0,10),
                active: true
            });
        if (error) setError(error.message);
        else setError(null);
        setSaving(null);
        // Refresh data
        const {data: tenanciesData} = await supabase
            .from("tenancies")
            .select("id, tenant_id, suite_id, active, end_date")
            .eq("active", true);
        setTenancies(tenanciesData || []);
    };

    if (loading) return <div className="p-8">Loading...</div>;
    return (
        <div className="flex flex-col min-h-screen w-full bg-[#181820] text-gray-100">
            <div className="flex-1 flex flex-col p-8 max-w-7xl w-full mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-purple-300">Tenants</h1>
                <div className="bg-[#23232b] rounded-xl shadow-lg p-6 mb-8 border border-purple-900/30">
                    <form className="flex flex-col md:flex-row gap-4 items-end" onSubmit={addTenant}>
                        <div className="flex flex-col w-full md:w-1/3">
                            <label className="mb-1 text-sm text-purple-200">Name</label>
                            <input
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                className="bg-[#181820] border border-purple-900/30 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/3">
                            <label className="mb-1 text-sm text-purple-200">Email</label>
                            <input
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="bg-[#181820] border border-purple-900/30 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <Button type="submit" size="sm" className="bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold px-6 py-2 rounded-lg shadow mt-4 md:mt-0">
                            Add Tenant
                        </Button>
                    </form>
                    {error && <div className="text-red-400 mt-2">{error}</div>}
                </div>
                <div className="overflow-x-auto rounded-xl shadow-lg bg-[#23232b] border border-purple-900/30">
                    <table className="min-w-full divide-y divide-purple-900/30">
                        <thead className="bg-[#23232b]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Suite</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#181820] divide-y divide-purple-900/30">
                            {tenants.map((tenant) => {
                                const currentSuiteId = getCurrentSuiteId(tenant.id);
                                return (
                                    <tr key={tenant.id} className="border-b border-purple-900/20 hover:bg-purple-900/10 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">{tenant.name || tenant.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{tenant.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                className="bg-[#23232b] border border-purple-900/30 rounded px-2 py-1 text-gray-100"
                                                value={assignments[tenant.id] || currentSuiteId || ''}
                                                onChange={e => handleSuiteChange(tenant.id, e.target.value)}
                                            >
                                                <option value="">Select suite</option>
                                                {suites.map(suite => (
                                                    <option key={suite.id} value={suite.id}>{suite.suite_number}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Button
                                                onClick={() => handleAssignSuite(tenant.id)}
                                                disabled={saving === tenant.id || !(assignments[tenant.id] && assignments[tenant.id] !== currentSuiteId)}
                                                className="bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold px-4 py-2 rounded-lg shadow disabled:opacity-60"
                                            >
                                                {saving === tenant.id ? 'Saving...' : 'Assign'}
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
