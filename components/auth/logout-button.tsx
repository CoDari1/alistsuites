// In `components/auth/logout-button.tsx`
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/lib/supabase/client";

export function LogoutButton() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }
    window.location.href = "/";
  };

  return (
      <Button
          onClick={handleLogout}
          className="bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold rounded-md px-6 py-3 transition-all duration-200 hover:from-purple-700 hover:to-purple-500 shadow-md"
      >
        Logout
      </Button>
  );
}