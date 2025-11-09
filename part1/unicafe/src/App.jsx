
import { useState } from 'react'

const handleScore = ({good, neutral, bad}) => {
  const score = (good * 1) + (bad * -1) + (neutral * 0)
  return score
}

const handleAverage = ({ good, neutral, bad }) => {
  const total = good + neutral + bad 
  // handle division by zero for total
  if (total === 0) { 
    return 0;
  }
  const scoreSum = handleScore({good, neutral, bad})
  const avg = scoreSum / total;
  return avg
}

const handlePositivePercentage = ({good, all}) => {
    // handle division by zero for all
    if (all === 0) {
      return 0;
    }
    const positivePercent = (good / all) * 100;
    return positivePercent
}

const StatisticTableRow = ({ text, value }) => {
  return (
    <tr>
      {/* Table cells display the key/value pair */}
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};


const DisplayStats = (statsData) => {
  if (statsData.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
    <table>
      <thead>
          {/* BROKE: <th> cannot be a direct child of <thead>.
              FIX: Wrap <th> elements inside a <tr> within <thead>. */}
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
      </thead>
      {/* BROKE: <table> cannot contain direct <tr> children.
          FIX: Wrap StatisticTableRow components (which render <tr>) inside a <tbody>.
          BROKE: In HTML, whitespace text nodes cannot be a child of <tbody> (hydration error).
          FIX: Remove whitespace directly between <tbody> and its first child (StatisticTableRow)
               and between subsequent StatisticTableRow components. */}
      <tbody>
        <StatisticTableRow key="good" text="good" value ={statsData.good} />{/* FIX: Removed whitespace */}
        <StatisticTableRow key="bad" text="bad" value ={statsData.bad} />{/* FIX: Removed whitespace */}
        <StatisticTableRow key="neutral" text="neutral" value ={statsData.neutral} />{/* FIX: Removed whitespace */}
        <StatisticTableRow key="all" text="all" value ={statsData.all} />{/* FIX: Removed whitespace */}
        <StatisticTableRow key="average" text="average" value ={statsData.average.toFixed(2)} />{/* FIX: Removed whitespace */}
        <StatisticTableRow key="positive" text="positive" value ={statsData.positivePercentage.toFixed(2)} />{/* FIX: Removed whitespace */}
      </tbody>
    </table>
    </>
  )
  
}

const Statistics = (props) => {
  console.log(props)
  const {good, neutral, bad} = props
  const all = good + neutral + bad 
  const average = handleAverage({ good, neutral, bad })
  const positivePercentage = handlePositivePercentage({ good, all }) 

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
  const handleGoodClick = () => setGood(prevGood => prevGood + 1)
  const handleNeutralClick = () => setNeutral(prevNeutral => prevNeutral + 1)
  const handleBadClick = () => setBad(prevBad => prevBad + 1)

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

