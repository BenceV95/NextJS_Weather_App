"use client";

import Weather from '@/app/components/Weather';
import { fetchLocationData, fetchWeatherData } from '@/app/lib/fetchingHelpers';
import type { WeatherData } from '@/app/types/main';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CityName() {

  const params = useParams();
  const cityName = params.name;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData(cityName as string);
  }, [cityName])

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
    <div>
      <p>City: <strong>{cityName}</strong></p>
      {weather && <Weather data={weather} />}
    </div>
  );
}
