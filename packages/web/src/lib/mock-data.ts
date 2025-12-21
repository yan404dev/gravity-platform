export type User = {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
};

export const MOCK_USER: User = {
    id: 'mock-user-id',
    email: 'user@example.com',
    displayName: 'John Doe',
    role: 'user',
};

export const MOCK_ADMIN: User = {
    id: 'mock-admin-id',
    email: 'admin@example.com',
    displayName: 'Alice Admin',
    role: 'admin',
};

export const MOCK_EVENTS = [
    {
        id: '1',
        title: 'Summer Music Festival',
        description: 'A day full of music and joy.',
        date: '2024-07-15',
        time: '14:00',
        address: 'Central Park, NY',
        background_image_url:
            'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000',
        target_date: '2024-07-15T14:00:00',
        creator: 'mock-user-id',
        created_by: 'mock-user-id',
    },
    {
        id: '2',
        title: 'Tech Conference 2024',
        description: 'The future of technology.',
        date: '2024-09-10',
        time: '09:00',
        address: 'Convention Center, SF',
        background_image_url:
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
        target_date: '2024-09-10T09:00:00',
        creator: 'mock-admin-id',
        created_by: 'mock-admin-id',
    },
    {
        id: '3',
        title: 'Community Art Workshop',
        description: 'Learn to paint with local artists.',
        date: '2024-08-05',
        time: '10:00',
        address: 'Downtown Community Center',
        background_image_url:
            'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1000',
        target_date: '2024-08-05T10:00:00',
        creator: 'mock-user-id',
        created_by: 'mock-user-id',
    },
];
