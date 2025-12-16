import { Navbar } from "@/components/navbar";

export default function Loading() {
    return (
        <>
            <Navbar />
            <main className="flex h-screen justify-center items-start w-full relative bg-white mx-auto my-0 max-lg:flex-col max-lg:h-auto">
                <div className="flex flex-col justify-end items-start fixed h-screen w-[calc(100%-540px)] left-0 top-0 overflow-hidden bg-gray-200 animate-pulse max-lg:relative max-lg:w-full max-lg:h-[400px]" />

                <div className="flex w-[540px] flex-col justify-start items-start fixed h-screen right-0 top-0 bg-white max-lg:relative max-lg:w-full max-lg:h-auto animate-pulse">
                    <div className="flex w-full flex-col gap-10 p-10 mt-20">
                        <div className="h-8 w-1/3 bg-gray-200" />
                        <div className="h-12 w-2/3 bg-gray-200" />
                        <div className="h-4 w-full bg-gray-200" />
                        <div className="h-4 w-full bg-gray-200" />
                        <div className="h-4 w-3/4 bg-gray-200" />
                    </div>

                    <div className="fixed bottom-0 right-0 w-[540px] px-10 py-6 max-lg:relative max-lg:w-full">
                        <div className="h-[50px] w-full bg-gray-200" />
                    </div>
                </div>
            </main>
        </>
    );
}
