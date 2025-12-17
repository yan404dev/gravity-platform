export const storageService = {
    async uploadEventImage(file: File): Promise<string> {
        console.log("Mock: Uploading image", file.name);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return a dummy URL
        return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000";
    }
};
