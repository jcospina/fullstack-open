import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

const baseCountriesUrl = "https://restcountries.eu/rest/v2/name/";
const baseWeatherUrl = "http://api.weatherstack.com/current";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const onSearchChange = (event) => setSearchTerm(event.target.value);
  useEffect(() => {
    if (searchTerm !== "") {
      const url = `${baseCountriesUrl}${searchTerm}`;
      axios.get(url).then((response) => {
        setCountries(response.data);
        if (response.data.length === 1) {
          setActiveCountry(response.data[0]);
        }
      });
    } else {
      setCountries([]);
      setActiveCountry(null);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (activeCountry) {
      const url = `${baseWeatherUrl}?access_key=${apiKey}&query=${activeCountry.capital}`;
      axios.get(url).then((response) => setWeather(response.data.current));
    } else {
      setWeather(null);
    }
  }, [activeCountry]);
  const onChangeActiveCountry = (index) => {
    setActiveCountry({
      ...countries[index],
    });
  };
  return (
    <>
      <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <SearchResults
        countries={countries}
        weather={weather}
        activeCountry={activeCountry}
        onChangeActiveCountry={onChangeActiveCountry}
      ></SearchResults>
    </>
  );
};

export default App;
