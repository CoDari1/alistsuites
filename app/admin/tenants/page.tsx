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

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Tenants Manager</h1>
            <form className="mb-6 flex gap-2 items-end" onSubmit={addTenant}>
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border px-2 py-1"
                />
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border px-2 py-1"
                />
                <Button type="submit" size="sm">Add Tenant</Button>
            </form>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border">
                    <thead>
                    <tr>
                        <th className="border px-2 py-1">Email</th>
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Suite #</th>
                        <th className="border px-2 py-1">Price ($/mo)</th>
                        <th className="border px-2 py-1">Created At</th>
                        <th className="border px-2 py-1">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tenants.map((tenant) => {
                        const suiteInfo = getSuiteInfo(tenant.id);
                        return (
                            <tr key={tenant.id}>
                                <td className="border px-2 py-1">{tenant.email}</td>
                                <td className="border px-2 py-1">{tenant.name ?? "-"}</td>
                                <td className="border px-2 py-1">{suiteInfo.suiteNumber}</td>
                                <td className="border px-2 py-1">{suiteInfo.price}</td>
                                <td className="border px-2 py-1">{tenant.created_at ?? "-"}</td>
                                <td className="border px-2 py-1">
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => removeTenant(tenant.id)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
