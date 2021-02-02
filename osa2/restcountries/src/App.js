import React, { useState, useEffect } from 'react';
import Countries from "./Components/Countries";
import FindCountry from "./Components/FindCountry";
import axios from "axios";

const App = () => {
    const [ countries, setCountries ] = useState([]);
    const [ newSearch, setNewSearch ] = useState('');
    const [ showCountries, setShowCountries ] = useState(true);

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    const handleSearchChange = (event) => {
        setShowCountries(true);
        setNewSearch(event.target.value);
    }

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newSearch));

    return(
        <div>
            <FindCountry newSearch={newSearch} handleSearchChange={handleSearchChange}/>
            <Countries filteredCountries={filteredCountries} search={newSearch} setShowCountries={setShowCountries} showCountries={showCountries}/>
        </div>
    );
}

export default App