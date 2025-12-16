import { Navbar } from "@/components/navbar";

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="h-16 w-64 bg-gray-200 animate-pulse mb-8" />

                <div className="flex gap-0 mb-12">
                    <div className="h-12 w-48 bg-gray-200 animate-pulse border border-white" />
                    <div className="h-12 w-48 bg-gray-200 animate-pulse border border-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 aspect-[4/3] mb-3" />
                            <div className="h-6 w-3/4 bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
