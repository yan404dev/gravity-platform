import { Navbar } from '@/shared/components/navbar';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 pt-24 pb-8 md:px-8 md:pt-32 md:pb-16">
                <div className="grid animate-pulse items-start gap-8 md:gap-16 lg:grid-cols-2">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <div className="aspect-[4/3] w-full bg-gray-200" />
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div className="mb-8 h-14 w-3/4 bg-gray-200" />
                        <div className="mb-6 flex gap-4">
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
