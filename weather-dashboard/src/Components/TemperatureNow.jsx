import feels_like from "../assets/feels-like.png";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import wind from "../assets/wind.png";

export default function TemperatureNow({ weather, currentTime }) {
  return (
    <div className="section-1">
      <div className="left-side">
        <p className="city-name">{weather.location.name}</p>
        <p className="date-time">{currentTime}</p>
        <span>
          <img
            className="weather-img-big"
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p className="temperature">
            {Math.floor(weather.current.temp_c)}
            <sup>°C</sup>
          </p>
        </span>
        <p className="weather-main">{weather.current.condition.text}</p>
      </div>
      <div className="right-side">
        <span>
          <img className="icons-img" src={feels_like} alt="feels-like" />
          <p>
            Feels like
            <br />
            {Math.floor(weather.current.feelslike_c)} °C
          </p>
        </span>
        <span>
          <img className="icons-img" src={humidity} alt="humidity" />
          <p>
            Humidity
            <br />
            {weather.current.humidity}%
          </p>
        </span>
        <span>
          <img className="icons-img" src={wind} alt="wind" />
          <p>
            Wind
            <br />
            {Math.floor(weather.current.wind_kph)} km/h
          </p>
        </span>
        <span>
          <img className="icons-img" src={pressure} alt="pressure" />
          <p>
            Pressure
            <br />
            {weather.current.pressure_mb} hPa
          </p>
        </span>
      </div>
    </div>
  );
}
