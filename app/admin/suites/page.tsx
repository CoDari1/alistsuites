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
        <div className="p-8">
            <h1 className="text-2xl mb-4">Suites Manager</h1>
            <form className="mb-6 flex gap-2 items-end" onSubmit={handleCreate}>
                <input
                    name="suite_number"
                    placeholder="Suite #"
                    value={form.suite_number}
                    onChange={handleChange}
                    required
                    className="border px-2 py-1"
                />
                <input
                    name="size_sqft"
                    placeholder="Size (sqft)"
                    value={form.size_sqft}
                    onChange={handleChange}
                    type="number"
                    className="border px-2 py-1"
                />
                <input
                    name="price_monthly"
                    placeholder="Price ($/mo)"
                    value={form.price_monthly}
                    onChange={handleChange}
                    type="number"
                    step="0.01"
                    className="border px-2 py-1"
                />
                <input
                    name="features"
                    placeholder="Features (comma separated)"
                    value={form.features}
                    onChange={handleChange}
                    className="border px-2 py-1"
                />
                <label className="flex items-center gap-1">
                    <input
                        name="is_available"
                        type="checkbox"
                        checked={form.is_available}
                        onChange={handleChange}
                    />
                    Available
                </label>
                <Button type="submit" size="sm">Add Suite</Button>
            </form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border">
                    <thead>
                    <tr>
                        <th className="border px-2 py-1">Suite #</th>
                        <th className="border px-2 py-1">Size (sqft)</th>
                        <th className="border px-2 py-1">Price ($/mo)</th>
                        <th className="border px-2 py-1">Features</th>
                        <th className="border px-2 py-1">Available</th>
                        <th className="border px-2 py-1">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {suites.map((suite) => (
                        <tr key={suite.id}>
                            <td className="border px-2 py-1">{suite.suite_number}</td>
                            <td className="border px-2 py-1">{suite.size_sqft ?? "-"}</td>
                            <td className="border px-2 py-1">{suite.price_monthly?.toFixed(2) ?? "-"}</td>
                            <td className="border px-2 py-1">{suite.features?.join(", ") ?? "-"}</td>
                            <td className="border px-2 py-1">{suite.is_available ? "Yes" : "No"}</td>
                            <td className="border px-2 py-1">
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="ml-2"
                                    onClick={() => handleDelete(suite.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
