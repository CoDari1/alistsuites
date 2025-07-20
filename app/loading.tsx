export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#2f2f38]/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-white/80 text-lg">Loading...</p>
            </div>
        </div>
    );
}