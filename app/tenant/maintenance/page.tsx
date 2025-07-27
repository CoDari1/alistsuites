"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/app/lib/supabase/client";

export default function MaintenanceRequestForm() {
    const searchParams = useSearchParams();
    const suiteId = searchParams.get("suiteId") || "";
    const [tenantId, setTenantId] = useState("");

    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUserId() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setTenantId(user.id);
        }
        fetchUserId();
    }, []);

    // Show error if required params are missing
    if (!tenantId || !suiteId) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#2f2f38]">
                <div className="bg-[#23232b] p-8 rounded-2xl shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Missing Required Information</h2>
                    <p className="text-gray-200 mb-2">This page requires both a tenant and suite to be specified.</p>
                    <p className="text-gray-400 text-sm">Please access this page from your dashboard or contact support if you believe this is an error.</p>
                </div>
            </div>
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch("/api/maintenance/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tenant_id: tenantId, suite_id: suiteId, description }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Failed to submit request");
        } else {
            alert("Maintenance request submitted!");
            setDescription("");
        }

        setLoading(false);
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[#2f2f38] z-0">
            <Card className="w-full max-w-lg p-10 shadow-2xl border-0 rounded-3xl bg-[#23232b]/90 mx-4">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-white drop-shadow flex items-center gap-2">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17.25v.008h.008v-.008H9.75zm4.5 0v.008h.008v-.008h-.008zm-7.5-2.25a2.25 2.25 0 012.25-2.25h7.5a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-2.25zm2.25-6.75V6.75A2.25 2.25 0 0111.25 4.5h1.5A2.25 2.25 0 0115 6.75v1.5"></path></svg>
                    Submit Maintenance Request
                </h2>
                <form onSubmit={handleSubmit} className="space-y-7">
                    <div>
                        <Label htmlFor="description" className="mb-2 block text-lg font-semibold text-gray-200">Description</Label>
                        <textarea
                            id="description"
                            placeholder="Describe the maintenance issue"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={6}
                            className="w-full rounded-xl border border-purple-700/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#2f2f38] text-gray-100 placeholder-gray-400 shadow-sm transition-all duration-200"
                        />
                    </div>
                    {error && <p className="text-red-400 text-base font-medium text-center animate-pulse">{error}</p>}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 shadow-lg transition-all duration-200 disabled:opacity-60 text-white"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                Submitting...
                            </span>
                        ) : "Submit Request"}
                    </Button>
                </form>
                <div className="mt-10 border-t border-purple-900/30 pt-8">
                    <h3 className="text-xl font-bold mb-4 text-purple-200 flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"></path><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4m-5 4h18"></path></svg>
                        Your Recent Requests
                    </h3>
                    {/* Placeholder for recent requests, can be replaced with real data */}
                    <div className="text-gray-400 text-sm">Coming soon: View your recent maintenance requests here.</div>
                </div>
            </Card>
        </div>
    );
}
