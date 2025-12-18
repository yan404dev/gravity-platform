import { Navbar } from '@/components/navbar';

export default function Loading() {
    return (
        <>
            <Navbar />
            <main className="relative mx-auto my-0 flex h-screen w-full items-start justify-center bg-white max-lg:h-auto max-lg:flex-col">
                <div className="fixed top-0 left-0 flex h-screen w-[calc(100%-540px)] animate-pulse flex-col items-start justify-end overflow-hidden bg-gray-200 max-lg:relative max-lg:h-[400px] max-lg:w-full" />

                <div className="fixed top-0 right-0 flex h-screen w-[540px] animate-pulse flex-col items-start justify-start bg-white max-lg:relative max-lg:h-auto max-lg:w-full">
                    <div className="mt-20 flex w-full flex-col gap-10 p-10">
                        <div className="h-8 w-1/3 bg-gray-200" />
                        <div className="h-12 w-2/3 bg-gray-200" />
                        <div className="h-4 w-full bg-gray-200" />
                        <div className="h-4 w-full bg-gray-200" />
                        <div className="h-4 w-3/4 bg-gray-200" />
                    </div>

                    <div className="fixed right-0 bottom-0 w-[540px] px-10 py-6 max-lg:relative max-lg:w-full">
                        <div className="h-[50px] w-full bg-gray-200" />
                    </div>
                </div>
            </main>
        </>
    );
}
