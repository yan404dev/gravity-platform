import { Navbar } from '@/components/navbar';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 md:px-8">
                <div className="mb-8 h-16 w-64 animate-pulse bg-gray-200" />

                <div className="mb-12 flex gap-0">
                    <div className="h-12 w-48 animate-pulse border border-white bg-gray-200" />
                    <div className="h-12 w-48 animate-pulse border border-white bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="mb-3 aspect-[4/3] bg-gray-200" />
                            <div className="h-6 w-3/4 bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
