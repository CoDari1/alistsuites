import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="w-full bg-[#23232b] border-b border-purple-900/30 px-6 h-16 flex items-center justify-between z-50">
      <div className="flex items-center gap-6">
        <Link href="/admin" className="text-xl font-extrabold text-purple-400 tracking-wide">Admin</Link>
        <Link href="/admin/tenants" className="text-gray-300 hover:text-purple-300 transition">Tenants</Link>
        <Link href="/admin/suites" className="text-gray-300 hover:text-purple-300 transition">Suites</Link>
        <Link href="/admin/maintenance" className="text-gray-300 hover:text-purple-300 transition">Maintenance</Link>
      </div>
      <div className="text-gray-400 text-sm">A-List Suites Admin</div>
    </nav>
  );
}
