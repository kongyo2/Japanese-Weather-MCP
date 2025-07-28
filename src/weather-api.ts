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

export class WeatherAPI {
  private baseUrl = "https://weather.tsukumijima.net/api/forecast";
  private lastRequestTime = 0;
  private readonly minInterval = 500; // 0.5 seconds in milliseconds

  private async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minInterval) {
      const delay = this.minInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequestTime = Date.now();
  }

  async getWeatherForecast(cityId: string): Promise<WeatherForecast> {
    await this.enforceRateLimit();
    
    try {
      const response = await fetch(`${this.baseUrl}/city/${cityId}`, {
        headers: {
          "User-Agent": "WeatherMCP/1.0.0",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as WeatherForecast;
      return data;
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async getWeatherForecastByQuery(cityId: string): Promise<WeatherForecast> {
    await this.enforceRateLimit();
    
    try {
      const response = await fetch(`${this.baseUrl}?city=${cityId}`, {
        headers: {
          "User-Agent": "WeatherMCP/1.0.0",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as WeatherForecast;
      return data;
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

// Common city IDs for reference
export const CITY_IDS = {
  // Fukuoka
  FUKUOKA: "400010",
  // Hiroshima
  HIROSHIMA: "340010",
  // Kawasaki
  KAWASAKI: "140020",
  // Kobe
  KOBE: "280010",
  // Kyoto
  KYOTO: "260010",
  // Nagoya
  NAGOYA: "230010",
  // Osaka
  OSAKA: "270000",
  // Sapporo
  SAPPORO: "016010",
  // Tokyo
  TOKYO: "130010",
  // Yokohama
  YOKOHAMA: "140010",
} as const;

export type CityId = (typeof CITY_IDS)[keyof typeof CITY_IDS];
