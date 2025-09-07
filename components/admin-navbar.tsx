import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="fixed inset-0 min-h-screen w-full bg-[#181820] flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#23232b] border-r border-purple-900/30 flex-shrink-0 flex flex-row md:flex-col h-20 md:h-full z-40">
                <div className="flex items-center justify-center h-20 px-4 md:px-6 border-b border-purple-900/30 w-full">
                    <span className="text-lg md:text-xl font-extrabold text-purple-400 tracking-wide">Admin</span>
                </div>
                <nav className="flex flex-row md:flex-col gap-2 mt-0 md:mt-8 px-2 md:px-4 w-full justify-center md:justify-start">
                    <a href="/admin" className="px-3 md:px-4 py-2 rounded-lg text-purple-200 bg-purple-900/30 font-semibold mb-0 md:mb-1 text-center">Dashboard</a>
                    <a href="/admin/tenants" className="px-3 md:px-4 py-2 rounded-lg text-gray-400 hover:bg-purple-900/20 hover:text-purple-200 transition text-center">Tenants</a>
                    <a href="/admin/suites" className="px-3 md:px-4 py-2 rounded-lg text-gray-400 hover:bg-purple-900/20 hover:text-purple-200 transition text-center">Suites</a>
                    <a href="/admin/maintenance" className="px-3 md:px-4 py-2 rounded-lg text-gray-400 hover:bg-purple-900/20 hover:text-purple-200 transition text-center">Maintenance</a>
                </nav>
            </aside>
  );
}
