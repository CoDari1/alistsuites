// In `components/auth/auth-button.tsx`
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "../ui/button";
import { supabase } from "@/app/lib/supabase/client";
import { LogoutButton } from "@/components/auth/logout-button";

export function AuthButton() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                    {user.email}
                </span>
                <LogoutButton />
            </div>
        );
    }

    return (
        <div className="ml-4 flex items-center gap-4">
            <Button
                asChild
                size="default"
                variant="outline"
                className="bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold rounded-md px-6 py-3 transition-all duration-200 hover:from-purple-700 hover:to-purple-500 shadow-md"
            >
                <Link href="/auth/login">Sign in</Link>
            </Button>
        </div>
    );
}