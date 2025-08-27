"use client";

import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { fetchLocationData, fetchWeatherData } from "./lib/fetchingHelpers";

import type { WeatherData } from "./types/main";
import Weather from "./components/Weather";

export default function Home() {

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  const fetchData = async (location: string) => {
    try {
      setLoading(true);

      const locationData = await fetchLocationData(location);
      const weatherData = await fetchWeatherData(locationData);
      setWeather(weatherData);

    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="p-2 bg-blue-600 rounded hover:cursor-pointer hover:bg-blue-700"
        onClick={() => fetchData("budapest")}
        disabled={loading}
      >
        {loading ? "Loading..." : "Search Budapest"}
      </button>
      <div>
        {weather && <Weather data={weather} />}
        {error && <h1>Error: {error.message}</h1>}
      </div>
    </>
  );
}

// reverseLocation: http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
// weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}