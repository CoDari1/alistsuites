import AdminNavbar from '@/components/admin-navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#181820]">
      <AdminNavbar />
      {children}
    </div>
  );
}

