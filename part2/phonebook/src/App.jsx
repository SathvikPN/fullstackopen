import { useState } from 'react'

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
  
  console.log('matchedPersons :>> ', matchedPersons);


  return (
    <div>
      search by name: <input value={name} onChange={handleNameChange} />
      <p> Matching Results: {matchedPersons.length} </p>
      <div>
        { matchedPersons.map( (person, index) => {
          const serialNumber = index + 1

          return (
            <p key={person.name}> ({serialNumber}) {person.name} :: {person.phone} :: {person.id}  </p>
          )
        }) }
      </div>
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // onSubmit of form, add Name to Persons
  const addPerson = (event) => {
    event.preventDefault()
    console.log("btn clicked", event.target)
    const newPersonObject = {
      id: crypto.randomUUID(),
      name: newName,
      phone: newNumber
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
        return <div key={person.id}> {person.name}  {person.phone} </div>
      }) }
    </div>
  )
}

export default App