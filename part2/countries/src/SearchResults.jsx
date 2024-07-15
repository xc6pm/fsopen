import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import Weather from "./Weather"

const SearchResults = ({ query, onCountrySelected }) => {
    const [allCountries, setAllCountries] = useState(null)
    useEffect(() => {
        axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => {
            setAllCountries(response.data)
        })
    }, [])

    if (!allCountries)
        return <p>Data not loaded yet...</p>

    if (!query)
        return <p>Type something to search...</p>

    const queryLower = query.toLowerCase()
    const searchResults = allCountries.filter(c => c.name.common.toLowerCase().includes(queryLower))

    if (searchResults.length === 0)
        return <p>The query yielded no results</p>

    if (searchResults.length > 10)
        return <p>Too many matches, specify another filter</p>

    if (searchResults.length > 1)
        return searchResults.map(c =>
            <p key={c.name.common}>
                {c.name.common} 
                <button onClick={() => onCountrySelected(c.name.common)}>show</button>
            </p>
        )

    return (
        <div>
            <h1>{searchResults[0].name.common}</h1>
            <p>capital {searchResults[0].capital[0]}</p>
            <p>area {searchResults[0].area}</p>

            <h4>languages</h4>

            <ul>
                {Object.entries(searchResults[0].languages).map(e => <li key={e[0]}>{e[1]}</li>)}
            </ul>

            <img src={searchResults[0].flags.png} alt={searchResults[0].flags.alt} />

            <Weather city={searchResults[0].name.common}/>
        </div>
    )
}

export default SearchResults