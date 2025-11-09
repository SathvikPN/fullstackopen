import { useState } from 'react'

const handleFeedback = ({statsData}) => {
  if (statsData.all == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
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


const handleScore = (props) => {
  const {good, neutral, bad} = props
  const score = (good * 1) + (bad * -1) + (neutral * 0)
  return score
}

const handleAverage = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad 
  const scoreSum = handleScore(props)
  const avg = scoreSum / total;
  return avg
}

const handlePositivePercentage = ({good, all}) => {
    const positivePercent = (good / all) * 100;
    return positivePercent
}

const Statistics = (props) => {
  console.log(props)
  const {good, neutral, bad} = props
  const [all, setAll] = useState( (good + neutral + bad) || 0)
  const [average, setAverage] = useState( handleAverage(props) || 0)
  const [positivePercentage, setPositivePercentage] = useState( handlePositivePercentage(good, all) || 0)

  const statsData = {
    good: good,
    bad: bad,
    neutral: neutral,
    all: all,
    average: average,
    positivePercentage: positivePercentage
  };

  return (
    <>
      <h1>Statistics</h1>
      {handleFeedback(statsData)}
    </>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Event handlers for each button click
  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

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
