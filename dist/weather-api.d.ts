export interface WeatherForecast {
    copyright: {
        image: {
            height: number;
            link: string;
            title: string;
            url: string;
            width: number;
        };
        link: string;
        provider: Array<{
            link: string;
            name: string;
            note: string;
        }>;
        title: string;
    };
    description: {
        bodyText: string;
        headlineText: string;
        publicTime: string;
        publicTimeFormatted: string;
        text: string;
    };
    forecasts: Array<{
        chanceOfRain: {
            T00_06: string;
            T06_12: string;
            T12_18: string;
            T18_24: string;
        };
        date: string;
        dateLabel: string;
        detail: {
            wave: null | string;
            weather: null | string;
            wind: null | string;
        };
        image: {
            height: number;
            title: string;
            url: string;
            width: number;
        };
        telop: string;
        temperature: {
            max: {
                celsius: null | string;
                fahrenheit: null | string;
            };
            min: {
                celsius: null | string;
                fahrenheit: null | string;
            };
        };
    }>;
    link: string;
    location: {
        area: string;
        city: string;
        district: string;
        prefecture: string;
    };
    publicTime: string;
    publicTimeFormatted: string;
    publishingOffice: string;
    title: string;
}
export declare class WeatherAPI {
    private baseUrl;
    getWeatherForecast(cityId: string): Promise<WeatherForecast>;
    getWeatherForecastByQuery(cityId: string): Promise<WeatherForecast>;
}
export declare const CITY_IDS: {
    readonly FUKUOKA: "400010";
    readonly HIROSHIMA: "340010";
    readonly KAWASAKI: "140020";
    readonly KOBE: "280010";
    readonly KYOTO: "260010";
    readonly NAGOYA: "230010";
    readonly OSAKA: "270000";
    readonly SAPPORO: "016010";
    readonly TOKYO: "130010";
    readonly YOKOHAMA: "140010";
};
export type CityId = typeof CITY_IDS[keyof typeof CITY_IDS];
//# sourceMappingURL=weather-api.d.ts.map