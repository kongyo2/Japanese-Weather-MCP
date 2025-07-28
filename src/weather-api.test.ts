import { describe, expect, it } from "vitest";

import { CITY_IDS, WeatherAPI } from "./weather-api.js";

describe("WeatherAPI", () => {
  const weatherAPI = new WeatherAPI();

  it("should have valid city IDs", () => {
    expect(CITY_IDS.TOKYO).toBe("130010");
    expect(CITY_IDS.OSAKA).toBe("270000");
    expect(CITY_IDS.KYOTO).toBe("260010");
  });

  it("should create WeatherAPI instance", () => {
    expect(weatherAPI).toBeInstanceOf(WeatherAPI);
  });

  // Note: We don't test actual API calls in unit tests to avoid rate limiting
  // and external dependencies. In a real project, you would use mocks or
  // integration tests for API calls.
});
