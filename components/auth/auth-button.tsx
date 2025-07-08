'use client';

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "../ui/button";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function AuthButton() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
    }, []);

    if (user) {
        return (
            <div className="flex items-center gap-4">
                Hey, {user.email}!
                <Button size="sm" variant="outline" onClick={() => supabase.auth.signOut()}>
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
                <Link href="/auth/login">Sign in</Link>
            </Button>
        </div>
    );
}