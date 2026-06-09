export default function SunDetails({ weather}) {
  const sun = weather.forecast.forecastday[0].astro;
  //const cityDate = new Date(cityTime);

  return (
    <div className="sundetail-wrapper">
      <h3 className="sundetail-heading">Sunrise & Sunset</h3>

      <div className="sun-timing">
        <div className="block">
          <p>Sunrise</p>
          <strong>{sun.sunrise}</strong>
          <small>Moonrise: {sun.moonrise}</small>
        </div>

        <div className="block">
          <p>Sunset</p>
          <strong>{sun.sunset}</strong>
          <small>Moonset: {sun.moonset}</small>
        </div>
      </div>
    </div>
  );
}