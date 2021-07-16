const Weather = (props) => {
  const weather = props.weather;
  const city = props.country.capital;
  if (weather) {
    return (
      <>
        <h2>Weather in {city}</h2>
        <p>
          <b>Temperature:</b> {weather.temperature}
        </p>
        <img src={weather.weather_icons[0]} alt={city} />
        <p>
          <b>Wind:</b> {weather.wind_speed} km/h direction {weather.wind_dir}
        </p>
      </>
    );
  } else {
    return <p>Loading temperature...</p>;
  }
};

export default Weather;
