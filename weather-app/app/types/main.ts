export type LocalNames = {
    [languageCode: string]: string;
};

export type CityData = {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
};

export type WeatherData = {
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