import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import wind from "../assets/wind.png";
import visibility from "../assets/visibility.png";

export default function WeatherDetails({ weather }) {
  return (
    <div className="details-section">
      <div className="small-box">
        <span>
          <img className="icons-blue" src={humidity} alt="humidity" />
          <p>
            Humidity
            <br />
            {weather.current.humidity}%
          </p>
        </span>
      </div>
      <div className="small-box">
        <span>
          <img className="icons-blue" src={wind} alt="wind" />
          <p>
            Wind Speed
            <br />
            {Math.floor(weather.current.wind_kph)} km/h
          </p>
        </span>
      </div>
      <div className="small-box">
        <span>
          <img className="icons-blue" src={pressure} alt="pressure" />
          <p>
            Pressure
            <br />
            {weather.current.pressure_mb} hPa
          </p>
        </span>
      </div>
      <div className="small-box">
        <span>
          <img className="icons-blue" src={visibility} alt="visibility" />
          <p>
            Visibility
            <br />
            {weather.current.vis_km} km
          </p>
        </span>
      </div>
    </div>
  );
}
