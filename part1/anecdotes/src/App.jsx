import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
    
  const [selected, setSelected] = useState(0)

  // Handler function to select a new random anecdote
  const handleClick = () => {
    // Generate a random integer between 0 and the total number of anecdotes
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    
    // Update the state, which triggers a re-render with the new anecdote
    setSelected(randomIndex);
  }

  return (
    <div>
      {/* Display the anecdote corresponding to the current 'selected' index */}
      <p>{anecdotes[selected]}</p>
      <button onClick={handleClick}>Next Anecdote</button>
    </div>
  )
}

export default App
