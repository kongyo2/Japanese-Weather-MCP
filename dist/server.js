import { FastMCP } from "fastmcp";
import { z } from "zod";
import { WeatherAPI, CITY_IDS } from "./weather-api.js";
const weatherAPI = new WeatherAPI();
const server = new FastMCP({
    name: "Japanese Weather API",
    version: "1.0.0",
});
// Tool to get weather forecast for a specific city
server.addTool({
    annotations: {
        openWorldHint: true, // This tool interacts with external weather API
        readOnlyHint: true, // This tool doesn't modify anything
        title: "Get Weather Forecast",
    },
    description: "Get weather forecast for a Japanese city using city ID",
    execute: async (args) => {
        try {
            const forecast = await weatherAPI.getWeatherForecast(args.cityId);
            // Format the response in a readable way
            const today = forecast.forecasts[0];
            const tomorrow = forecast.forecasts[1];
            const dayAfter = forecast.forecasts[2];
            let result = `🌤️ Weather Forecast for ${forecast.location.prefecture} ${forecast.location.city}\n`;
            result += `📅 Published: ${forecast.publicTimeFormatted}\n`;
            result += `🏢 Office: ${forecast.publishingOffice}\n\n`;
            // Today's forecast
            result += `📅 Today (${today.dateLabel}):\n`;
            result += `   Weather: ${today.telop}\n`;
            result += `   Max Temp: ${today.temperature.max.celsius || 'N/A'}°C\n`;
            result += `   Min Temp: ${today.temperature.min.celsius || 'N/A'}°C\n`;
            result += `   Rain Chance: ${today.chanceOfRain.T06_12} (6-12h), ${today.chanceOfRain.T12_18} (12-18h)\n`;
            if (today.detail.weather) {
                result += `   Details: ${today.detail.weather}\n`;
            }
            if (today.detail.wind) {
                result += `   Wind: ${today.detail.wind}\n`;
            }
            result += '\n';
            // Tomorrow's forecast
            result += `📅 Tomorrow (${tomorrow.dateLabel}):\n`;
            result += `   Weather: ${tomorrow.telop}\n`;
            result += `   Max Temp: ${tomorrow.temperature.max.celsius || 'N/A'}°C\n`;
            result += `   Min Temp: ${tomorrow.temperature.min.celsius || 'N/A'}°C\n`;
            result += `   Rain Chance: ${tomorrow.chanceOfRain.T06_12} (6-12h), ${tomorrow.chanceOfRain.T12_18} (12-18h)\n`;
            if (tomorrow.detail.weather) {
                result += `   Details: ${tomorrow.detail.weather}\n`;
            }
            if (tomorrow.detail.wind) {
                result += `   Wind: ${tomorrow.detail.wind}\n`;
            }
            result += '\n';
            // Day after tomorrow's forecast
            result += `📅 Day After Tomorrow (${dayAfter.dateLabel}):\n`;
            result += `   Weather: ${dayAfter.telop}\n`;
            result += `   Max Temp: ${dayAfter.temperature.max.celsius || 'N/A'}°C\n`;
            result += `   Min Temp: ${dayAfter.temperature.min.celsius || 'N/A'}°C\n`;
            result += `   Rain Chance: ${dayAfter.chanceOfRain.T06_12} (6-12h), ${dayAfter.chanceOfRain.T12_18} (12-18h)\n`;
            if (dayAfter.detail.weather) {
                result += `   Details: ${dayAfter.detail.weather}\n`;
            }
            if (dayAfter.detail.wind) {
                result += `   Wind: ${dayAfter.detail.wind}\n`;
            }
            return result;
        }
        catch (error) {
            return `Error fetching weather data: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    },
    name: "get_weather_forecast",
    parameters: z.object({
        cityId: z.string().describe("City ID for the Japanese city (e.g., '130010' for Tokyo, '270000' for Osaka)"),
    }),
});
// Tool to get available city IDs
server.addTool({
    annotations: {
        openWorldHint: false, // This tool doesn't interact with external systems
        readOnlyHint: true, // This tool doesn't modify anything
        title: "Get Available City IDs",
    },
    description: "Get a list of available city IDs for Japanese cities",
    execute: async () => {
        let result = "🏙️ Available Japanese City IDs:\n\n";
        Object.entries(CITY_IDS).forEach(([name, id]) => {
            result += `${name}: ${id}\n`;
        });
        result += "\n💡 You can use these IDs with the get_weather_forecast tool.";
        result += "\n📖 For more city IDs, visit: https://weather.tsukumijima.net/primary_area.xml";
        return result;
    },
    name: "get_available_city_ids",
    parameters: z.object({}),
});
// Tool to get weather forecast by city name (using common cities)
server.addTool({
    annotations: {
        openWorldHint: true, // This tool interacts with external weather API
        readOnlyHint: true, // This tool doesn't modify anything
        title: "Get Weather by City Name",
    },
    description: "Get weather forecast for common Japanese cities by name",
    execute: async (args) => {
        try {
            const cityId = CITY_IDS[args.cityName.toUpperCase()];
            if (!cityId) {
                const availableCities = Object.keys(CITY_IDS).join(', ');
                return `City '${args.cityName}' not found. Available cities: ${availableCities}`;
            }
            const forecast = await weatherAPI.getWeatherForecast(cityId);
            // Format the response in a readable way
            const today = forecast.forecasts[0];
            let result = `🌤️ Weather for ${forecast.location.prefecture} ${forecast.location.city}\n`;
            result += `📅 Published: ${forecast.publicTimeFormatted}\n\n`;
            result += `📅 Today:\n`;
            result += `   Weather: ${today.telop}\n`;
            result += `   Max Temp: ${today.temperature.max.celsius || 'N/A'}°C\n`;
            result += `   Min Temp: ${today.temperature.min.celsius || 'N/A'}°C\n`;
            result += `   Rain Chance: ${today.chanceOfRain.T06_12} (6-12h), ${today.chanceOfRain.T12_18} (12-18h)\n`;
            if (today.detail.weather) {
                result += `   Details: ${today.detail.weather}\n`;
            }
            if (today.detail.wind) {
                result += `   Wind: ${today.detail.wind}\n`;
            }
            return result;
        }
        catch (error) {
            return `Error fetching weather data: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    },
    name: "get_weather_by_city_name",
    parameters: z.object({
        cityName: z.enum(['TOKYO', 'OSAKA', 'KYOTO', 'FUKUOKA', 'SAPPORO', 'NAGOYA', 'YOKOHAMA', 'KOBE', 'KAWASAKI', 'HIROSHIMA']).describe("Name of the Japanese city"),
    }),
});
// Resource for weather API documentation
server.addResource({
    async load() {
        return {
            text: `Japanese Weather API Documentation

This MCP server provides access to Japanese weather forecasts using the weather.tsukumijima.net API.

Available Tools:
1. get_weather_forecast - Get weather forecast using city ID
2. get_available_city_ids - List available city IDs
3. get_weather_by_city_name - Get weather for common cities by name

Common City IDs:
- Tokyo: 130010
- Osaka: 270000
- Kyoto: 260010
- Fukuoka: 400010
- Sapporo: 016010
- Nagoya: 230010
- Yokohama: 140010
- Kobe: 280010
- Kawasaki: 140020
- Hiroshima: 340010

For more city IDs, visit: https://weather.tsukumijima.net/primary_area.xml

API Source: https://weather.tsukumijima.net/
Data provided by: Japan Meteorological Agency`,
        };
    },
    mimeType: "text/plain",
    name: "Weather API Documentation",
    uri: "file:///docs/weather-api.txt",
});
// Prompt for weather-related queries
server.addPrompt({
    arguments: [
        {
            description: "City name or location for weather information",
            name: "location",
            required: true,
        },
    ],
    description: "Generate a weather forecast request",
    load: async (args) => {
        return `Please provide weather information for ${args.location}. 

You can use the following tools:
1. get_weather_by_city_name - for common Japanese cities
2. get_weather_forecast - for any city using its ID
3. get_available_city_ids - to see available city options

If you need a specific city ID, you can check the available options first.`;
    },
    name: "weather-forecast",
});
server.start({
    transportType: "stdio",
});
//# sourceMappingURL=server.js.map