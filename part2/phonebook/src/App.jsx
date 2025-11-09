import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  // onSubmit of form, add Name to Persons
  const addName = (event) => {
    event.preventDefault()
    console.log("btn clicked", event.target)
    const newPersonObject = {
      name: newName
    }
    
    // const isNameExist = persons.filter((person) => person.name === newName) // iterates all array even if matched early
    const isNameExist = persons.some((person) => person.name === newName)

    if(isNameExist) {
      alert(`${newName} already added to phonebook`)
    } else {
      setPersons(persons.concat(newPersonObject))
    }

    
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log("input changed", event.target.value);
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App