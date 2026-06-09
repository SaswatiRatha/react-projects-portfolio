export default function WeeklyForecast({ weather }) {
  return (
    <div className="section-2">
      <h3 className="forecast-heading">7-Day Forecast</h3>
      <div className="five-day-container">
        {weather.forecast.forecastday.map((day, index) => (
          <div className="day-card" key={index}>
            <p className="day-name">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              className="weather-img"
              src={`https:${day.day.condition.icon}`}
              alt=""
            />
            <p className="temp-max">{Math.floor(day.day.maxtemp_c)}°</p>
            <p className="temp-min">{Math.floor(day.day.mintemp_c)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
