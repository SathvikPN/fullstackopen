import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";

import countryService from './services/country' 

function App() {
  const [country, setCountry] = useState('')
  const [cdata, setCdata] = useState([])
  // State to hold the country object to display in the detailed view
  const [selectedCountry, setSelectedCountry] = useState(null) 

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

  // Reusable component/function to render country details
  let CountryDetails = (c) => {
    console.log("selected Country",c)
    return (
        <div>
          <p>Country Details</p>
          <h3>{c.name.official}</h3>
          <li> Capital: {c.capital && c.capital[0]} </li>
          <li> Area: {c.area} </li>

          <h4>Languages</h4>
          <ul>
            {/* Added check for c.languages existence and type safety */}
            {c.languages && Object.entries(c.languages).map(([code, name]) => {
              return (
                <li key={code}>
                  {code.toUpperCase()}: {name}
                </li>
              )
            })}
          </ul>

          
          <li>Flag Emoji: {c.flag} </li>
          {/* Ensure c.flags exists before accessing png */}
          {c.flags && <img src={c.flags.png} alt={`Flag of ${c.name.official}`} />}
        </div>
      )  
  }


  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
    // Clear the selected detail view whenever the search query changes
    setSelectedCountry(null)
  }

  // Handler for the "show" button click
  const handleShowClick = (countryObject) => {
    // This updates state, triggering a re-render where displayContent will use it.
    setSelectedCountry(countryObject);
  }

  let match = cdata.filter((c) => {
    return (
      c.name.official.toLowerCase()
        .includes(country.toLowerCase())
    )
  })

  let displayContent;
  
  // Highest priority check: If a country is selected, display its details immediately.
  if (selectedCountry) {
    // The details view is active, so render the details component.
    displayContent = CountryDetails(selectedCountry);
  } else if (country === '') {
    // Condition A: Search input is empty. Show message.
    displayContent = <p>Start typing a country name to search.</p>
  } else if (match.length > 10) {
    // Condition B: More than 10 matches found. Display the count.
    displayContent = <p>{match.length} countries found. Please make your query more specific.</p>
  } else if (match.length > 1) {
    // Condition C: Between 2 and 10 matches found. Display the list with "show" buttons.
    displayContent = (
      <div>
        <h3>Matching Countries:</h3>
        <ul>
          {match.map((c) => (
            <div key={c.name.official}>
            <li>
              {c.name.official} 
              {/* Correctly call the state handler to trigger re-render. */}
              <button onClick={() => handleShowClick(c)}>  show</button> 
            </li>
            </div>
          ))}
        </ul>
      </div>
    )
  } else if (match.length === 1) {
    // Condition D: Exactly 1 match found. Automatically show details.
    let c = match[0]
    displayContent = CountryDetails(c)
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