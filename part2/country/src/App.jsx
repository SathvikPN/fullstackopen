import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";

import countryService from './services/country'


function App() {
  const [country, setCountry] = useState('')
  const [cdata, setCdata] = useState([])

  useEffect(() => {
    countryService.getAll()
    .then(refCountries => {
      setCdata(refCountries)
      console.info('api returned ok')
    })
    .catch(err => {
      console.error("Error in API Response", err)
      console.error(`Filtered ERROR: 
        code: ${err.code}
        url: ${err.config.url}
        msg: ${err.message}
      `);
      
    })
  }, []) // [] empty dependancy array: API call runs only once when the component first mounts.

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  let match = cdata.filter((c) => {
    return (
      c.name.official.toLowerCase()
        .includes(country.toLowerCase())
    )
  })

  let displayContent;
  if (country === '') {
    // Condition A: Search input is empty. Show nothing.
    displayContent = <p>Start typing a country name to search.</p>
  } else if (match.length > 10) {
    // Condition B: More than 10 matches found. Display the count.
    displayContent = <p>{match.length} countries found. Please make your query more specific.</p>
  } else if (match.length > 1) {
    // Condition C: Between 2 and 10 matches found. Display the list.
    displayContent = (
      <div>
        <h3>Matching Countries:</h3>
        <ul>
          {/* Map through the filtered list and display each match */}
          {match.map((c) => (
            <li key={c.name.official}>{c.name.official}</li>
          ))}
        </ul>
      </div>
    )
  } else if (match.length === 1) {
    // Condition D: Exactly 1 match found. Display the list (or detailed view, but here just the name).
    console.log(match)
    let c = match[0]
    displayContent = (
      <div>
        <p>Unique Match Found</p>
        <h3>{c.name.official}</h3>
        <li> Capital: {c.capital[0]} </li>
        <li> Area: {c.area} </li>

        <h4>Languages</h4>
        <ul>
          {/* 1. Use Object.entries() to convert the object into an array of [key, value] pairs. 
              Example Output: [['eng', 'English'], ['hin', 'Hindi'], ['tam', 'Tamil']] */}

          {Object.entries(c.languages).map(([code, name]) => {
            // 2. Destructure the array into two variables: 'code' (key) and 'name' (value).
            return (
              // 3. Render the key and value, using the key (code) for the list item key prop.
              <li key={code}>
                {code.toUpperCase()}: {name}
              </li>
            )
          })}
        </ul>

        
        <li>Flag Emoji: {c.flag} </li>
        <img src={c.flags.png} alt="" />
        {/* <img src={c.flags.svg} alt="" /> */}


        {/* In a real app, you would show detailed info like capital, population, etc., here */}
      </div>
    )
  } else {
    // Condition E: 0 matches found, but the search input is not empty.
    displayContent = <p>No countries match "{country}".</p>
  }






  return (
    <div>
      find countries: <input value={country} onChange={handleCountryChange} autoFocus />

      {displayContent}

      <hr />
      DEBUG: All countries {cdata.map((c, idx) => {
        return (
          <li key={c.name.official}> {idx+1}. {c.name.official}</li>
        )
      })}
    </div>
  )
}

export default App
