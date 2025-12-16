export const useRotatingBadge = (text: string) => {
    const getTextRepetitions = (text: string) => {
        const baseRepetitions = 5;
        const textLength = text.length;

        if (textLength <= 4) return 8; // Short text like "LIVE"
        if (textLength <= 6) return 6; // Medium text like "BROWSE"
        return baseRepetitions; // Longer text
    };

    const repetitions = getTextRepetitions(text);
    const offsetIncrement = 100 / repetitions;

    return {
        repetitions,
        offsetIncrement
    };
};
