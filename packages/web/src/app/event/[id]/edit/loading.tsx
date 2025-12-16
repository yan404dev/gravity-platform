import { Navbar } from "@/components/navbar";

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start animate-pulse">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <div className="w-full aspect-[4/3] bg-gray-200" />
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div className="h-14 w-3/4 bg-gray-200 mb-8" />
                        <div className="flex gap-4 mb-6">
                            <div className="h-12 w-1/3 bg-gray-200" />
                            <div className="h-12 w-1/3 bg-gray-200" />
                        </div>
                        <div className="h-12 w-full bg-gray-200" />
                        <div className="h-40 w-full bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}
