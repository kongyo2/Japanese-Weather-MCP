# Weather MCP Server Usage Examples

This document shows how to use the Japanese Weather MCP Server with various MCP clients.

## Configuration

Add the following to your MCP client configuration:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-mcp-server/dist/server.js"],
      "env": {}
    }
  }
}
```

## Tool Usage Examples

### 1. Get Weather by City Name

**Tool:** `get_weather_by_city_name`

**Parameters:**

```json
{
  "cityName": "TOKYO"
}
```

**Expected Response:**

```
🌤️ Weather for Tokyo 東京
📅 Published: 2024/01/15 05:00:00

📅 Today:
   Weather: 晴れ
   Max Temp: 12°C
   Min Temp: 3°C
   Rain Chance: 0% (6-12h), 10% (12-18h)
   Details: 晴れ
   Wind: 北の風
```

### 2. Get Available City IDs

**Tool:** `get_available_city_ids`

**Parameters:** None

**Expected Response:**

```
🏙️ Available Japanese City IDs:

TOKYO: 130010
OSAKA: 270000
KYOTO: 260010
FUKUOKA: 400010
SAPPORO: 016010
NAGOYA: 230010
YOKOHAMA: 140010
KOBE: 280010
KAWASAKI: 140020
HIROSHIMA: 340010

💡 You can use these IDs with the get_weather_forecast tool.
📖 For more city IDs, visit: https://weather.tsukumijima.net/primary_area.xml
```

### 3. Get Weather by City ID

**Tool:** `get_weather_forecast`

**Parameters:**

```json
{
  "cityId": "130010"
}
```

**Expected Response:**

```
🌤️ Weather Forecast for Tokyo 東京
📅 Published: 2024/01/15 05:00:00
🏢 Office: 気象庁

📅 Today (今日):
   Weather: 晴れ
   Max Temp: 12°C
   Min Temp: 3°C
   Rain Chance: 0% (6-12h), 10% (12-18h)
   Details: 晴れ
   Wind: 北の風

📅 Tomorrow (明日):
   Weather: 曇り
   Max Temp: 10°C
   Min Temp: 2°C
   Rain Chance: 20% (6-12h), 30% (12-18h)
   Details: 曇り
   Wind: 北東の風

📅 Day After Tomorrow (明後日):
   Weather: 雨
   Max Temp: 8°C
   Min Temp: 1°C
   Rain Chance: 70% (6-12h), 80% (12-18h)
   Details: 雨
   Wind: 東の風
```

## Prompt Usage

### Weather Forecast Request

**Prompt:** `weather-forecast`

**Parameters:**

```json
{
  "location": "Tokyo"
}
```

**Expected Response:**

```
Please provide weather information for Tokyo.

You can use the following tools:
1. get_weather_by_city_name - for common Japanese cities
2. get_weather_forecast - for any city using its ID
3. get_available_city_ids - to see available city options

If you need a specific city ID, you can check the available options first.
```

## Error Handling

The server handles various error scenarios:

1. **Invalid City ID:**

   ```
   Error fetching weather data: HTTP error! status: 404
   ```

2. **Network Issues:**

   ```
   Error fetching weather data: Failed to fetch weather data: Network error
   ```

3. **Invalid City Name:**
   ```
   City 'INVALID_CITY' not found. Available cities: TOKYO, OSAKA, KYOTO, FUKUOKA, SAPPORO, NAGOYA, YOKOHAMA, KOBE, KAWASAKI, HIROSHIMA
   ```

## Rate Limiting

Remember to respect the API rate limits:

- Use a custom User-Agent header (already implemented)
- Avoid rapid successive requests
- Maintain at least 0.5-second intervals between requests

## Integration Examples

### With Claude Desktop

1. Add the server configuration to your Claude Desktop settings
2. Restart Claude Desktop
3. Use natural language to request weather information:
   - "What's the weather in Tokyo?"
   - "Show me the forecast for Osaka"
   - "Get weather information for Kyoto"

### With Other MCP Clients

The server follows the MCP specification and should work with any compliant client. The tools provide structured access to Japanese weather data with proper error handling and rate limiting.
