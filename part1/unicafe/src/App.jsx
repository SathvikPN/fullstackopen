import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [all, setAll] = useState(0)
  // const [average, setAverage] = useState(0)
  // const [postive, setPositive] = useState(0)

  // const handleAverage = ( {good, bad, all} ) => {
  //   const avg = (good - bad) / (all)
  //   setAverage(avg)
  // }

  const handleGoodClick = () => {
    setGood(good + 1) 
    setAll(all + 1)
    // handleAverage(good+1, bad, all+1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    // handleAverage(good, bad+1, all+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    // handleAverage(good, bad, all+1)
  }
  


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}> good </button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h1>Statistics</h1>

      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        {/* <hr />
        <li>all {all}</li>
        <li>average {average}</li> */}
      </ul>
    </div>
  )
}

export default App