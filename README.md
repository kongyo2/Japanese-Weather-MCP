# Japanese Weather MCP Server

[![smithery badge](https://smithery.ai/badge/@kongyo2/japanese-weather-mcp)](https://smithery.ai/server/@kongyo2/japanese-weather-mcp)

<a href="https://glama.ai/mcp/servers/@kongyo2/Japanese-Weather-MCP">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@kongyo2/Japanese-Weather-MCP/badge" />
</a>

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/kongyo2/Japanese-Weather-MCP)

A Model Context Protocol (MCP) server that provides access to Japanese weather forecasts using the [weather.tsukumijima.net](https://weather.tsukumijima.net/) API.

## Features

- 🌤️ Get weather forecasts for Japanese cities
- 📍 Support for major Japanese cities (Tokyo, Osaka, Kyoto, etc.)
- 📊 Detailed weather information including temperature, precipitation chance, and wind conditions
- 🏢 Data sourced from Japan Meteorological Agency
- 🔧 Easy-to-use MCP tools for weather queries

## Installation

### Installing via Smithery

To install japanese-weather-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@kongyo2/japanese-weather-mcp):

```bash
npx -y @smithery/cli install @kongyo2/japanese-weather-mcp --client claude
```

### Manual Installation
1. Clone this repository:

```bash
git clone https://github.com/kongyo2/Japanese-Weather-MCP
cd weather-mcp-server
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

### Development Mode

Run the server in development mode:

```bash
npm run dev
```

### Production Mode

Build and run the server:

```bash
npm run build
npm start
```

## Available Tools

### 1. `get_weather_forecast`

Get weather forecast for any Japanese city using its city ID.

**Parameters:**

- `cityId` (string): City ID for the Japanese city (e.g., '130010' for Tokyo)

**Example:**

```json
{
  "cityId": "130010"
}
```

### 2. `get_available_city_ids`

Get a list of available city IDs for common Japanese cities.

**Parameters:** None

**Returns:** List of available city IDs with their corresponding names.

### 3. `get_weather_by_city_name`

Get weather forecast for common Japanese cities by name.

**Parameters:**

- `cityName` (enum): Name of the Japanese city
  - Options: TOKYO, OSAKA, KYOTO, FUKUOKA, SAPPORO, NAGOYA, YOKOHAMA, KOBE, KAWASAKI, HIROSHIMA

**Example:**

```json
{
  "cityName": "TOKYO"
}
```

## Common City IDs

| City      | ID     | Prefecture |
| --------- | ------ | ---------- |
| Tokyo     | 130010 | Tokyo      |
| Osaka     | 270000 | Osaka      |
| Kyoto     | 260010 | Kyoto      |
| Fukuoka   | 400010 | Fukuoka    |
| Sapporo   | 016010 | Hokkaido   |
| Nagoya    | 230010 | Aichi      |
| Yokohama  | 140010 | Kanagawa   |
| Kobe      | 280010 | Hyogo      |
| Kawasaki  | 140020 | Kanagawa   |
| Hiroshima | 340010 | Hiroshima  |

For more city IDs, visit: https://weather.tsukumijima.net/primary_area.xml

## Weather Data Structure

The weather forecast includes:

- **Basic Information:**

  - Publication time and office
  - Location details (prefecture, city, district)

- **Forecast Data (3 days):**

  - Weather condition (telop)
  - Temperature (max/min in Celsius and Fahrenheit)
  - Precipitation chance (6-hour intervals)
  - Detailed weather information
  - Wind conditions
  - Wave height (for coastal areas)

- **Additional Information:**
  - Weather icons (SVG format)
  - Links to official JMA weather pages

## API Source

This MCP server uses the [weather.tsukumijima.net](https://weather.tsukumijima.net/) API, which provides:

- Livedoor Weather API compatible format
- Data from Japan Meteorological Agency
- No API key required
- Free to use

## Rate Limiting

Please be respectful of the API:

- Use a custom User-Agent header
- Avoid rapid successive requests
- Maintain at least 0.5-second intervals between requests

## Error Handling

The server includes comprehensive error handling:

- Network connectivity issues
- Invalid city IDs
- API service unavailability
- Data parsing errors

## Development

### Project Structure

```
weather-mcp-server/
├── src/
│   ├── server.ts          # Main MCP server implementation
│   └── weather-api.ts     # Weather API client
├── package.json
├── tsconfig.json
└── README.md
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Acknowledgments

- [weather.tsukumijima.net](https://weather.tsukumijima.net/) for providing the weather API
- Japan Meteorological Agency for the weather data
- [FastMCP](https://github.com/punkpeye/fastmcp) for the MCP framework

## Support

If you encounter any issues or have questions, please:

1. Check the [weather.tsukumijima.net documentation](https://weather.tsukumijima.net/)
2. Review the available city IDs
3. Ensure proper rate limiting
4. Open an issue in this repository
