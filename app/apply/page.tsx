'use client';

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";

type Suite = {
    id: string;
    suite_number: string;
};

const Page = () => {
    const [suites, setSuites] = useState<Suite[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuites = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("suites")
                .select("id, suite_number")
                .eq("is_available", true);
            if (!error && data) setSuites(data);
            setLoading(false);
        };
        fetchSuites();
    }, []);

    return (
        <div className="min-h-screen bg-[#2f2f38] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-[#4a4a4f] p-8 rounded-lg shadow-lg border border-[#3a3a42]">
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">Apply Now</h2>
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* ...other fields... */}
                        <div>
                            <label htmlFor="suite" className="block text-sm font-medium text-purple-300">Suite</label>
                            <select
                                id="suite"
                                name="suite"
                                required
                                className="mt-1 block w-full rounded bg-[#2f2f38] border-[#3a3a42] text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                disabled={loading}
                            >
                                <option value="">Select a suite</option>
                                {suites.map((suite) => (
                                    <option key={suite.id} value={suite.id}>
                                        Suite {suite.suite_number}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* ...other fields... */}
                    </div>
                    {/* ...submit button... */}
                </form>
            </div>
        </div>
    );
};

export default Page;