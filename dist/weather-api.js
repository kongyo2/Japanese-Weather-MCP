export class WeatherAPI {
    constructor() {
        this.baseUrl = 'https://weather.tsukumijima.net/api/forecast';
    }
    async getWeatherForecast(cityId) {
        try {
            const response = await fetch(`${this.baseUrl}/city/${cityId}`, {
                headers: {
                    'User-Agent': 'WeatherMCP/1.0.0',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getWeatherForecastByQuery(cityId) {
        try {
            const response = await fetch(`${this.baseUrl}?city=${cityId}`, {
                headers: {
                    'User-Agent': 'WeatherMCP/1.0.0',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
// Common city IDs for reference
export const CITY_IDS = {
    // Tokyo
    TOKYO: '130010',
    // Osaka
    OSAKA: '270000',
    // Kyoto
    KYOTO: '260010',
    // Fukuoka
    FUKUOKA: '400010',
    // Sapporo
    SAPPORO: '016010',
    // Nagoya
    NAGOYA: '230010',
    // Yokohama
    YOKOHAMA: '140010',
    // Kobe
    KOBE: '280010',
    // Kawasaki
    KAWASAKI: '140020',
    // Hiroshima
    HIROSHIMA: '340010',
};
//# sourceMappingURL=weather-api.js.map