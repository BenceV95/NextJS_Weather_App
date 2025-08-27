"use client";

import { useState, useEffect } from "react";
import Footer from "./components/Footer";

type LocalNames = {
  [languageCode: string]: string;
};

type CityData = {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
};

type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

export default function Home() {

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {


  }, [])

  const fetchLocationData = async (location: string) => {
    const directSearchURL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;

    try {
      const res = await fetch(directSearchURL);

      if (!res.ok) {
        throw new Error("Failed to fetch location data!")
      }

      const data: CityData[] = await res.json();
      console.log("location data: ", data[0]);
      return data[0];

    } catch (e: any) {
      setError(e);
    }
  }

  const fetchWeatherData = async (cityData: CityData) => {
    const weatherDataURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric`;
    try {
      const res = await fetch(weatherDataURL);

      if (!res.ok) {
        throw new Error("Failed to fetch weather data!")
      }

      const data = await res.json();
      console.log("weather data: ", data);
      return data;

    } catch (e: any) {
      setError(e);
    }
  }

  const fetchData = async (location: string) => {
    try {
      setLoading(true);
      const locationData = await fetchLocationData(location);

      // this is here because of typescript
      if (locationData == undefined) {
        throw new Error("Location data failed!")
      }

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
      <main className="flex-1 p-4 flex flex-col items-center justify-center">
        <button
          className="p-2 bg-blue-600 rounded hover:cursor-pointer hover:bg-blue-700"
          onClick={() => fetchData("budapest")}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search Budapest"}
        </button>
        <div>
          {weather?.name}<br />
          {weather?.main.temp}
          {error && <h1>Error: {error}</h1>}
        </div>
      </main>
      <Footer />
    </>
  );
}

// reverseLocation: http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
// weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}