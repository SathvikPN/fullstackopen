import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: 123-123 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // onSubmit of form, add Name to Persons
  const addPerson = (event) => {
    event.preventDefault()
    console.log("btn clicked", event.target)
    const newPersonObject = {
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
    setNewNumber(event.target.value) // use the uset typed text via form
  }

  console.log("Persons: ", persons)

  return (
    <div>
      <h2>Phonebook</h2>
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
        return <div> {person.name}  {person.phone} </div>
      }) }
    </div>
  )
}

export default App