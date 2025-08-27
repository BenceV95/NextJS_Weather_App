import React from 'react'
import type { WeatherData } from '../types/main'

interface WeatherProp {
    data: WeatherData
}

const Weather = ({ data }: WeatherProp) => {
    return (
        <div className='bg-neutral-900 rounded p-4 flex flex-col justify-center items-center'>
            <h2>Weather in <strong>{data.name}</strong></h2>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Condition: {data.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
            />
        </div>
    );
}

export default Weather