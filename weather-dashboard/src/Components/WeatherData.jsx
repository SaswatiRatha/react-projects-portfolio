import HourlyForecast from "./HourlyForecast";
import SunDetails from "./SunDetails";
import TemperatureNow from "./TemperatureNow";
import WeatherDetails from "./WeatherDetails";
import WeeklyForecast from "./WeeklyForecast";

export default function WeatherData({ weather, currentTime, cityTime}) {


  return (
    <div className="weather-section">
      <div className="section-row">
        <TemperatureNow weather={weather} currentTime={currentTime}/>
        <WeeklyForecast weather={weather} />
      </div>
        <WeatherDetails weather={weather} />
        <HourlyForecast weather={weather} cityTime={cityTime} />
        <SunDetails weather={weather} />
      </div>

  );
}
