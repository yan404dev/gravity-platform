import { format } from "date-fns";

export const formatEventDate = (date: Date | undefined): string => {
    if (!date) return "Select Date";
    return format(date, "EEE, dd MMM");
};

export const formatEventTime = (time: string): string => {
    return time; // Can add 12h/24h conversion here if needed later
};

export const formatDate = (date: Date | string, formatStr: string = "MMM d, yyyy"): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, formatStr);
};
