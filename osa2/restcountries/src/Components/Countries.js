import React, { useState, useEffect } from 'react';
import axios from "axios";

const Countries = (props) => {

    const [ selectedCountry, setSelectedCountry ] = useState('');
    const [ weather, setWeather ] = useState([]);

    useEffect(() => {
        let capital;
        if (props.showCountries && props.filteredCountries.length > 0) {
            capital = props.filteredCountries[0].capital;
            if (capital === "") {
                capital = props.filteredCountries[1].capital;
            }
        } else if (!props.showCountries) {
            capital = selectedCountry.capital;
        }
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
            .then(response => {
                setWeather(response.data);
            })
    }, [props.filteredCountries]);

    if (props.search === '') {
        return (
            <></>
        )
    }

    if (props.filteredCountries.length === 1 || !props.showCountries) {

        let country;
        if (props.showCountries) {
            country = props.filteredCountries[0];
        } else {
            country = selectedCountry;
        }
        console.log(country.capital);
        return(
            <>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language =>
                        <li key={language.iso639_1}>{language.name}</li>
                    )}
                </ul>
                <img src={country.flag} style={{width: 150}} alt={`flag of ${country.name}`}/>
                <h2>Weather in {country.capital}</h2>
                <p><b>temperature:</b> {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons[0]} style={{width: 75}} alt={`current weather`}/>
                <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>

            </>
        )
    }
    if (props.filteredCountries.length > 10) {
        return(
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    } else {
        return(
            <>
                {props.filteredCountries.map(country =>
                        <p key={country.numericCode}>
                            {country.name}
                            <button onClick={function() {
                                props.setShowCountries(false);
                                setSelectedCountry(country);
                            }}>show</button>
                        </p>
                )}
            </>
        )
    }
}

export default Countries