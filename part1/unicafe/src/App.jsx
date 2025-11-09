import { useState } from 'react'

const handleScore = ({good, neutral, bad}) => {
  const score = (good * 1) + (bad * -1) + (neutral * 0)
  return score
}

const handleAverage = ({ good, neutral, bad }) => {
  const total = good + neutral + bad 
  const scoreSum = handleScore({good, neutral, bad})
  const avg = scoreSum / total;
  return avg
}

const handlePositivePercentage = ({good, all}) => {
    const positivePercent = (good / all) * 100;
    return positivePercent
}

const DisplayStats = (statsData) => {
  if (statsData.all == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <ul>
        <li>good {statsData.good}</li>
        <li>neutral {statsData.neutral}</li>
        <li>bad {statsData.bad}</li>
        <hr />
        <li>all {statsData.all}</li>
        <li>average {statsData.average.toFixed(2)}</li> {/* Format average to 2 decimal places */}
        <li>positive {statsData.positivePercentage.toFixed(2)} %</li> {/* Display positive percentage */}
      </ul>
    </>
  )
  
}

const Statistics = (props) => {
  console.log(props)
  const {good, neutral, bad} = props
  const all = good + neutral + bad 
  const average = handleAverage({ good, neutral, bad })
  const positivePercentage = handlePositivePercentage({ all, good }) 
  // handlePositivePercentage(good, all) positional args has to maintain order

  const statsData = {
    good, neutral, bad, all, average, positivePercentage
  };

  return (
    <>
      <h1>Statistics</h1>
      {DisplayStats(statsData)}
    </>

  )
}


// --- 5. Main Application Component ---
const App = () => {
  // Use separate useState hooks for independent, simple state variables (Best Practice for performance)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Event handlers for each button click
  // Use the functional update form (prev => prev + 1) to ensure reliability against race condition
  const handleGoodClick = () => setGood(good => good+1)
  const handleNeutralClick = () => setNeutral(neutral => neutral+1)
  const handleBadClick = () => setBad(bad => bad+1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
