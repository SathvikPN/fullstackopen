import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivePercentage, setPositivePercentage] = useState(0) // Renamed from 'postive' for clarity

  // This function should calculate average based on the LATEST state values,
  // or values passed to it. Let's make it accept current counts.
  // It's crucial to call this AFTER state updates, or pass the NEW values.
  const calculateAverageAndPositive = (currentGood, currentNeutral, currentBad) => {
    const total = currentGood + currentNeutral + currentBad;
    // Avoid division by zero
    if (total === 0) {
      setAverage(0);
      setPositivePercentage(0);
      return;
    }

    const scoreSum = (currentGood * 1) + (currentBad * -1); // Neutral is * 0, so it doesn't affect sum
    const avg = scoreSum / total;
    setAverage(avg);

    const positivePercent = (currentGood / total) * 100;
    setPositivePercentage(positivePercent);
  }

  // Event handlers for each button click
  const handleGoodClick = () => {
    const newGood = good + 1;
    const newAll = all + 1;
    setGood(newGood);
    setAll(newAll);
    calculateAverageAndPositive(newGood, neutral, bad);
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    const newAll = all + 1;
    setNeutral(newNeutral);
    setAll(newAll);
    calculateAverageAndPositive(good, newNeutral, bad);
  }

  const handleBadClick = () => {
    const newBad = bad + 1;
    const newAll = all + 1;
    setBad(newBad);
    setAll(newAll);
    calculateAverageAndPositive(good, neutral, newBad);
  }

  const handleFeedback = (all) => {
    if (all == 0) {
      return (
        <p>No feedback given</p>
      )
    }

    return (
      <>
        <h1>Statistics</h1>
        <ul>
          <li>good {good}</li>
          <li>neutral {neutral}</li>
          <li>bad {bad}</li>
          <hr />
          <li>all {all}</li>
          <li>average {average.toFixed(2)}</li> {/* Format average to 2 decimal places */}
          <li>positive {positivePercentage.toFixed(2)} %</li> {/* Display positive percentage */}
        </ul>
      </>
    )
    
  }
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      {handleFeedback(all)}
    </div>
  )
}

export default App
