import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import WeatherData from "./Components/WeatherData";

export default function App() {
  const [searchCity, setSearchCity] = useState("");
  const [city, setCity] = useState("Bhubaneswar");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    async function refreshWeather() {
      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}/forecast.json?q=${city}&key=${API_KEY}&days=7`,
        );

        if (!response.ok) {
          throw new Error("Unable to fetch weather data");
        }

        const data = await response.json();

        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    refreshWeather();

    const weatherInterval = setInterval(() => {
      refreshWeather();
    }, 60000);

    return () => clearInterval(weatherInterval);
  }, [city]);

  useEffect(() => {
    if (!weather) return;

    const interval = setInterval(() => {
      const date = new Date().toLocaleString("en-US", {
        timeZone: weather.location.tz_id,
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      const time = new Date().toLocaleString("en-US", {
        timeZone: weather.location.tz_id,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const fullDateTime = `${date} . ${time}`

      setCurrentTime(fullDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [weather]);


  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  if (loading && !weather) {
    return <h2>Loading weather details...</h2>;
  }

  const cityTime = new Date().toLocaleString("en-US", {
    timeZone: weather.location.tz_id,
  });

  function handleClick() {
    if (!searchCity.trim()) return;
    setCity(searchCity);
    setSearchCity("");
  }


  return (
    <div className="app-wrapper">
      <h1>Weather Dashboard</h1>
      <Header
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        handleClick={handleClick}
      />
      <div className="divider" />
      <WeatherData weather={weather} currentTime={currentTime} cityTime={cityTime} />
    </div>
  );
}
