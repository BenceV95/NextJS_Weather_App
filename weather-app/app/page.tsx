"use client";

import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { fetchLocationData, fetchWeatherData } from "./lib/fetchingHelpers";

import type { CityData, WeatherData } from "./types/main";
import Weather from "./components/Weather";
import Search from "./components/Search";

export default function Home() {

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          let loc: CityData = {
            name: "",
            local_names: {},
            country: "",
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          }
          try {
            const data = await fetchWeatherData(loc);
            setWeather(data);
          } catch (error:any) {
            setError(error.message);
          }
        },
        (err) => {
          setError(new Error("Permission denied or location unavailable"));
        }
      )
    } else {
      setError(new Error("Geolocation not supported"));
    }
  }, [])

  const fetchData = async (location: string) => {
    try {
      setLoading(true);
      setWeather(null);
      setError(null);
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
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer transition"
        onClick={() => fetchData("budapest")}
        disabled={loading}
      >
        {loading ? "Loading..." : "Search Budapest"}
      </button>
      <div>
        <Search onSearch={fetchData} loading={loading} />
      </div>
      <div>
        {weather && <Weather data={weather} />}
        {error && <h1 className="text-red-500">Error loading weather data. Reason: {error.message}</h1>}
      </div>
    </>
  );
}

// reverseLocation: http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
// weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}