import React from "react";
import Weather from "./Weather";

const InfoMessage = ({ message }) => {
  return <p>{message}</p>;
};

const LanguageList = ({ languages }) => {
  return (
    <ul>
      {languages.map((language, index) => (
        <li key="index">{language.name}</li>
      ))}
    </ul>
  );
};

const CountryFlag = ({ flag }) => {
  return (
    <>
      <img src={flag} alt={flag} />
    </>
  );
};
const CountryDetail = ({ country, weather }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <LanguageList languages={country.languages} />
      <CountryFlag flag={country.flag} />
      <Weather country={country} weather={weather} />
    </>
  );
};

const CountryList = ({ countries, onChangeActiveCountry }) => {
  return (
    <table>
      <tbody>
        {countries.map((country, index) => (
          <tr key={country.numericCode}>
            <td>{country.name}</td>
            <td>
              <button onClick={() => onChangeActiveCountry(index)}>Show</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SearchResults = (props) => {
  const countries = props.countries;
  const activeCountry = props.activeCountry;
  if (countries.length === 0) {
    return <InfoMessage message="No results found" />;
  } else if (countries.length > 10) {
    return <InfoMessage message="Too many results please narrow your search" />;
  } else if (activeCountry) {
    return <CountryDetail country={activeCountry} weather={props.weather} />;
  } else {
    return (
      <CountryList
        countries={countries}
        onChangeActiveCountry={props.onChangeActiveCountry}
      />
    );
  }
};

export default SearchResults;
