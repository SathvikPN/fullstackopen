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
    
  // State for tracking the currently displayed anecdote's index
  const [selected, setSelected] = useState(0)

  // State for tracking the vote count for each anecdote
  // An array of zeros, initialized to the length of the anecdotes array.
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Handler function to select a new random anecdote
  const handleNextAnecdote = () => {
    // Generate a random integer between 0 and the total number of anecdotes
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    
    // Update the state, which triggers a re-render with the new anecdote
    setSelected(randomIndex);
  }

  // Handler function to handle voting for the currently selected anecdote
  const handleVote = () => {
    // 1. Create a safe copy of the current 'votes' array (Immutability is key in React)
    const newVotes = [...votes];

    // 2. Increment the vote count for the currently 'selected' anecdote's index
    newVotes[selected] += 1;

    // 3. Update the state with the new array
    setVotes(newVotes);
  }

  const mostVotedAnecdote = () => {
    // Find the highest vote count and its corresponding index
    const maxVotes = Math.max(...votes);
    const highestVotedIndex = votes.indexOf(maxVotes);

    // Standard IF/ELSE conditional logic to determine what JSX to render
    if (maxVotes > 0) {
      // If at least one vote has been cast, display the most popular anecdote
      return (
        <div>
          <p>{anecdotes[highestVotedIndex]}</p>
          <p>Has {maxVotes} votes</p>
        </div>
      )
    } else {
      // If no votes have been recorded, display a placeholder message
      return (
        <p>No votes have been recorded yet.</p>
      )
    }
  }





  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      
      {/* Buttons */}
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next Anecdote</button>

      <hr />
      <h2>Anecdote with Most Votes</h2>
      {mostVotedAnecdote()}
    </div>
  )
}

export default App
