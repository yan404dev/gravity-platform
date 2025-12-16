export const locationService = {
    async getUserCountry(): Promise<string> {
        try {
            const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
            const data = await response.text();
            const locMatch = data.match(/loc=([A-Z]{2})/);

            if (locMatch && locMatch[1]) {
                const countryCode = locMatch[1];
                const countryNames: { [key: string]: string } = {
                    'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia',
                    'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
                    'BE': 'Belgium', 'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland',
                    'PL': 'Poland', 'CH': 'Switzerland', 'AT': 'Austria', 'IE': 'Ireland', 'PT': 'Portugal',
                    'IN': 'India', 'JP': 'Japan', 'CN': 'China', 'KR': 'South Korea', 'BR': 'Brazil',
                    'MX': 'Mexico', 'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'SG': 'Singapore',
                    'NZ': 'New Zealand', 'ZA': 'South Africa', 'RU': 'Russia', 'TR': 'Turkey', 'GR': 'Greece'
                };
                return countryNames[countryCode] || countryCode;
            }
            return 'the world';
        } catch (error) {
            console.error('Error detecting country:', error);
            return 'the world';
        }
    }
};
