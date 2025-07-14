"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase }from "@/app/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
