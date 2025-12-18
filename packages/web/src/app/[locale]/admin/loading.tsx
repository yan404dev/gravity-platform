export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
                <p className="animate-pulse text-lg font-medium">
                    Loading Admin Dashboard...
                </p>
            </div>
        </div>
    );
}
