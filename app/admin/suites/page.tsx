'use client';

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Suite = {
    id: string;
    suite_number: string;
    size_sqft?: number;
    price_monthly?: number;
    features?: string[];
    is_available?: boolean;
    photo_urls?: string[];
    created_at?: string;
};

export default function Page() {
    const [suites, setSuites] = useState<Suite[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        suite_number: "",
        size_sqft: "",
        price_monthly: "",
        features: "",
        is_available: true,
    });

    useEffect(() => {
        const fetchSuites = async () => {
            const { data, error } = await supabase.from("suites").select("*");
            if (!error && data) setSuites(data);
            setLoading(false);
        };
        fetchSuites();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const newSuite = {
            suite_number: form.suite_number,
            size_sqft: form.size_sqft ? parseInt(form.size_sqft) : null,
            price_monthly: form.price_monthly ? parseFloat(form.price_monthly) : null,
            features: form.features ? form.features.split(",").map(f => f.trim()) : [],
            is_available: form.is_available,
        };
        const { data, error } = await supabase.from("suites").insert([newSuite]).select();
        if (!error && data && data.length > 0) {
            setSuites((prev) => [...prev, data[0]]);
            setForm({
                suite_number: "",
                size_sqft: "",
                price_monthly: "",
                features: "",
                is_available: true,
            });
        }
    };

    const handleDelete = async (id: string) => {
        await supabase.from("suites").delete().eq("id", id);
        setSuites((prev) => prev.filter((suite) => suite.id !== id));
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-[#181820] text-gray-100">
            <div className="flex-1 flex flex-col p-8 max-w-7xl w-full mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-purple-300">Suites Manager</h1>
                <div className="bg-[#23232b] rounded-xl shadow-lg p-6 mb-8 border border-purple-900/30">
                    <form className="flex flex-col md:flex-row gap-4 items-end" onSubmit={handleCreate}>
                        <div className="flex flex-col w-full md:w-1/5">
                            <label className="mb-1 text-sm text-purple-200">Suite #</label>
                            <input
                                name="suite_number"
                                placeholder="Suite #"
                                value={form.suite_number}
                                onChange={handleChange}
                                required
                                className="bg-[#181820] border border-purple-900/30 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/5">
                            <label className="mb-1 text-sm text-purple-200">Size (sqft)</label>
                            <input
                                name="size_sqft"
                                placeholder="Size (sqft)"
                                value={form.size_sqft}
                                onChange={handleChange}
                                type="number"
                                className="bg-[#181820] border border-purple-900/30 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/5">
                            <label className="mb-1 text-sm text-purple-200">Price ($/mo)</label>
                            <input
                                name="price_monthly"
                                placeholder="Price ($/mo)"
                                value={form.price_monthly}
                                onChange={handleChange}
                                type="number"
                                step="0.01"
                                className="bg-[#181820] border border-purple-900/30 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/5">
                            <label className="mb-1 text-sm text-purple-200">Features</label>
                            <input
                                name="features"
                                placeholder="Features (comma separated)"
                                value={form.features}
                                onChange={handleChange}
                                className="bg-[#181820] border border-purple-900/30 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/5">
                            <label className="mb-1 text-sm text-purple-200">Available</label>
                            <label className="flex items-center gap-2">
                                <input
                                    name="is_available"
                                    type="checkbox"
                                    checked={form.is_available}
                                    onChange={handleChange}
                                    className="accent-purple-600 w-5 h-5"
                                />
                                <span className="text-purple-200">Yes</span>
                            </label>
                        </div>
                        <Button type="submit" size="sm" className="bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold px-6 py-2 rounded-lg shadow mt-4 md:mt-0">Add Suite</Button>
                    </form>
                </div>
                {loading ? (
                    <p className="text-purple-200">Loading...</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl shadow-lg bg-[#23232b] border border-purple-900/30">
                        <table className="min-w-full divide-y divide-purple-900/30">
                            <thead className="bg-[#23232b]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Suite #</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Size (sqft)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Price ($/mo)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Features</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Available</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#181820] divide-y divide-purple-900/30">
                                {suites.map((suite) => (
                                    <tr key={suite.id} className="border-b border-purple-900/20 hover:bg-purple-900/10 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">{suite.suite_number}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{suite.size_sqft ?? "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{suite.price_monthly?.toFixed(2) ?? "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{suite.features?.join(", ") ?? "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={suite.is_available ? "text-green-400" : "text-red-400"}>{suite.is_available ? "Yes" : "No"}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                            <Button size="sm" variant="outline" className="border-purple-700 text-purple-300">Edit</Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="ml-2 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white font-bold px-4 py-2 rounded-lg shadow"
                                                onClick={() => handleDelete(suite.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
