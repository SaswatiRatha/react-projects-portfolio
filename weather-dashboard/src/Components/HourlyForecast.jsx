export default function HourlyForecast({ weather, cityTime }) {
  const todayHours = weather.forecast.forecastday[0].hour;
  const tomorrowHours = weather.forecast.forecastday[1].hour;
  const allHours = [...todayHours, ...tomorrowHours];

  const cityDate = new Date(cityTime);
  const currentHour = cityDate.getHours();

  const filteredHours = allHours.filter((item) => {
    const itemDate = new Date(item.time);

    const isTomorrow =
      itemDate.toDateString() !== cityDate.toDateString();

    const itemHour = itemDate.getHours();

    return isTomorrow || itemHour >= currentHour;
  });

  const limitedHours = filteredHours.slice(0, 24);

  return (
    <div className="forecast-section">
      <h3 className="forecast-heading">Hourly Forecast</h3>

      <div className="forecast-wrapper">
        {limitedHours.map((item) => {
          const itemDate = new Date(item.time);
          const itemHour = itemDate.getHours();

          const isNow =
            itemDate.toDateString() === cityDate.toDateString() &&
            itemHour === currentHour;

          return (
            <div className="forecast-details" key={item.time}>
              <p>
                {isNow
                  ? "Now"
                  : itemDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
              </p>

              <img
                className="weather-img"
                src={item.condition.icon}
                alt={item.condition.text}
              />

              <p className="temp-hour">
                {Math.floor(item.temp_c)} °C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}