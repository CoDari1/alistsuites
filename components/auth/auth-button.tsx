'use client';

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "../ui/button";
import { supabase } from "@/app/lib/supabase/client";


export function AuthButton() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Initial fetch
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        // Listen for auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // Cleanup
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <Button size="lg" variant="outline" onClick={() => supabase.auth.signOut()}>
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <div className="ml-4 flex items-center gap-4">
            <Button asChild size="default" variant="outline">
                <Link href="/auth/login">Sign in</Link>
            </Button>
        </div>
    );
}