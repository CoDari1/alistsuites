import TenantNavbar from '@/components/tenant-navbar';

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#181820]">
      <TenantNavbar />
      {children}
    </div>
  );
}

