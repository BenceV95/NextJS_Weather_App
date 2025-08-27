import { CityData, WeatherData } from "../types/main";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function fetchLocationData(location: string): Promise<CityData> {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch location data");
  const data: CityData[] = await res.json();
  return data[0];
}

export async function fetchWeatherData(cityData: CityData): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
}
