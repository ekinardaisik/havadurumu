import { translateWeatherCode, formatDateAndDay, formatTime } from "./funciton";

const BASE_URL = import.meta.env.VITE_WEATHER_API;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeatherForCities = async (storedCities) => {
  const weatherPromises = storedCities.map((city) =>
    fetch(
      `${BASE_URL}/data/2.5/weather?q=${city.name},${city.country}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // API'den beklenen veri gelirse bu blok çalışacak
        if (data && data.main && data.weather && data.weather.length > 0) {
          return {
            id: city.id,
            name: city.name,
            country: city.country,
            cityId: data.id,
            lon: data.coord.lon,
            lat: data.coord.lat,
            degree: data.main.temp,
            status: translateWeatherCode(data.weather[0].id),
            icon:
              "http://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@2x.png",
            currentTemp: Math.round(data.main.temp),
            feelTemp: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            date: formatDateAndDay(data.dt).formattedDate,
            day: formatDateAndDay(data.dt).day,
            hours: formatTime(data.dt, data.timezone),
          };
        }
        // Eksik veya hatalı veri durumunda null döndür
        return null;
      })
      .catch((error) => {
        console.error(
          `Error fetching weather for ${city.name}, ${city.country}:`,
          error
        );
        return null; // Hata durumunda null döndür
      })
  );

  const results = await Promise.all(weatherPromises);
  return results.filter((result) => result !== null);
};

export { fetchWeatherForCities };
