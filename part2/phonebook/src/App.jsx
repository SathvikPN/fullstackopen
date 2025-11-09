import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ persons }) => {
  const [name, setName] = useState('')
  const handleNameChange = (event) => {
    console.log("search name:", event.target.value) // not name
    setName(event.target.value) // without this, search bar empty and target value only 1latest char inserted
  }

  // Perform filtering only if the input has at least one character
  const shouldFilter = name.length > 0;
  let matchedPersons = []
  if(shouldFilter) {
    matchedPersons = persons.filter((person) => 
      // person.name === name // exact match
      // Convert the person's name to lowercase
      person.name.toLowerCase() 
      // Check if it starts with the search string s, also converted to lowercase
      .startsWith(name.toLowerCase())
    )
  }
  
  // console.log('matchedPersons :>> ', matchedPersons);


  return (
    <div>
      search by name: <input value={name} onChange={handleNameChange} />
      <p> Matching Results: {matchedPersons.length} </p>
      <div>
        { matchedPersons.map( (person, index) => {
          const serialNumber = index + 1

          return (
            <p key={person.name}> ({serialNumber}) {person.name} :: {person.number} :: {person.id}  </p>
          )
        }) }
      </div>
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('useEffect entered');
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled for get notes')
      setPersons(response.data) // note: call to a state-updating function triggers the re-rendering of the component
    })
  }, []) // note: pass second param [], else infinite re-rerendering
  console.log('render', persons.length, 'persons');
  

  // onSubmit of form, add Name to Persons
  const addPerson = (event) => {
    event.preventDefault()
    console.log("btn clicked", event.target)
    const newPersonObject = {
      id: crypto.randomUUID(),
      name: newName,
      number: newNumber
    }
    
    // const isNameExist = persons.filter((person) => person.name === newName) // iterates all array even if matched early
    const isNameExist = persons.some((person) => person.name === newName)

    if(isNameExist) {
      alert(`${newName} already added to phonebook`)
    } else {
      setPersons(persons.concat(newPersonObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log("input changed", event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('handleNumberChange - event.target.value', event.target.value)
    // setNewNumber(newNumber) // newNumber itself a state var holding the previously set newNumber
    setNewNumber(event.target.value) // use the user typed text via form
  }

  console.log("Persons: ", persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName} && {newNumber} </div>
      <h2>Numbers</h2>
      { persons.map((person) => {
        return <div key={person.id}> {person.name}  {person.number} </div>
      }) }
    </div>
  )
}

export default App