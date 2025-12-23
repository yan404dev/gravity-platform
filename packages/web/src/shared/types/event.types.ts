export interface Event {
    id: string;
    title: string;
    background_image_url: string;
    address: string;
    date: string;
    time: string;
}

export interface EventDetail {
    id: string;
    title: string;
    creator: string;
    description: string;
    date: string;
    time: string;
    address: string;
    background_image_url: string;
    target_date: string;
}

export interface Registrant {
    display_name: string;
    registered_at: string;
}

export type EventFormData = {
    eventName: string;
    description: string;
    startTime: string;
    endTime: string;
    location: string;
};
