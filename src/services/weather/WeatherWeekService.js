import { translateWeatherCode, formatDateAndDay } from "./funciton";

const BASE_URL = import.meta.env.VITE_WEATHER_API;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeatherForWeek = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();

    return data.daily.map((day) => ({
      date: formatDateAndDay(day.dt).formattedDate,
      day: formatDateAndDay(day.dt).day,
      tempDay: Math.round(day.temp.day),
      tempFeel: Math.round(day.feels_like.day),
      humidity: day.humidity,
      tempMin: Math.round(day.temp.min),
      tempMax: Math.round(day.temp.max),
      windSpeed: Math.round(day.wind_speed),
      windDeg: day.wind_deg,
      rain: day.rain || "0",
      cloud: day.clouds,
      status: translateWeatherCode(day.weather[0].id),
      weatherMain: day.weather[0].main,
      weatherDescription: day.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
    }));
  } catch (error) {
    console.error(`Error fetching weekly weather:`, error);
    return []; // Hata durumunda boş bir dizi döndür
  }
};

export { fetchWeatherForWeek };
