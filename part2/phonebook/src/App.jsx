import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

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
  const [msg, setMsg] =useState('')

  // useEffect(() => {
  //   console.log('useEffect entered');
  //   axios.get('http://localhost:3001/persons').then(response => {
  //     console.log('promise fulfilled for get notes')
  //     setPersons(response.data) // note: call to a state-updating function triggers the re-rendering of the component
  //   })
  // }, []) // note: pass second param [], else infinite re-rerendering
  // console.log('render', persons.length, 'persons');

  // use services module to separate logic
  useEffect(() => {
    personService.getAll()
    .then(initalPersons => setPersons(initalPersons))
  }, [])
  

  // onSubmit of form, add Name to Persons
  const addPerson = (event) => {
    event.preventDefault()
    console.log("btn clicked", event.target)
    const newPersonObject = {
      id: crypto.randomUUID(), // let server decide unique id
      name: newName,
      number: newNumber
    }
    
    // const isNameExist = persons.filter((person) => person.name === newName) // iterates all array even if matched early
    const isNameExist = persons.some((person) => person.name === newName)

    if(isNameExist) {
      alert(`${newName} already added to phonebook`)
    } else {

      // axios.post('http://localhost:3001/persons', newPersonObject)
      // .then(response => {
      //   setPersons(persons.concat(response.data))
      // })
      // .catch(error => {
      //   alert(error)
      //   console.log('failed to put', error)
      // })

      // user service module
      personService.createPerson(newPersonObject)
      .then(responseData => {
        setPersons(persons.concat(responseData))
      })

      // reset ui form view, else this value retained/visible in input even after form submit
      setNewName('')
      setNewNumber('')
      setMsg(`Added ${newPersonObject.name} successfully`) // display right away
      setTimeout( () => {
        console.log('setting notification msg null')
        setMsg(null)
      }, 3000) // setmsg null after 3 seconds
    }
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

  const handleDeletePerson = (deletePersonObj) => {
    if(!window.confirm(`delete ${deletePersonObj.name} ?`)) {
      console.log("reject delete")
      return
    }

    console.log("deleting ", deletePersonObj.name, deletePersonObj.id)
    personService.deletePerson(deletePersonObj.id)
    .then(response => {
      console.log("delete response == ", response)
      setPersons(persons.filter(p => p.id !== deletePersonObj.id))
      setMsg(`Deleted ${deletePersonObj.name} successfully`) // display right away
      setTimeout( () => {
        console.log('setting notification msg null')
        setMsg(null)
      }, 3000) // setmsg null after 3 seconds
    })
    .catch(error => {
      // 🔴 FAILURE: An error occurred during the API call (rejected promise).
      
      if (error.response) {
        // ------------------------------------------------------------------
        // Case 1: API call *returned an error status* (e.g., 404, 400, 500).
        // This means the server received the request but rejected it.
        // ------------------------------------------------------------------

        if (error.response.status === 404) {
          // Specific Case: Resource Not Found (already deleted).
          // The item doesn't exist on the server, so we should sync the view!
          alert(`Information of ${deletePersonObj.name} was already removed from server.`);
          
          // FIX: Sync the view because the server confirms it's gone.
          setPersons(persons.filter(p => p.id !== deletePersonObj.id)); 

        } else {
          // Generic Server Error (e.g., 403 Forbidden, 500 Internal Server Error)
          console.error('API Call Errored (Server Response):', error.response.status, error.response.data);
          alert(`Server error occurred (${error.response.status}). Cannot delete ${deletePersonObj.name}.`);
          // If it's a 500, we typically DON'T sync the view, as we don't know the state.
        }
        
      } else if (error.request) {
        // ------------------------------------------------------------------
        // Case 2: API call failed due to no response (Network Error, Timeout).
        // The request was made, but no response was received (e.g., server offline).
        // ------------------------------------------------------------------
        console.error('Network Error (No Response):', error.request);
        alert('Network error or timeout. Please check your connection.');
        
        // We CANNOT sync the view, as we don't know if the deletion happened.
        
      } else {
        // ------------------------------------------------------------------
        // Case 3: Setup Error (Error in code/config).
        // Something went wrong in setting up the request.
        // ------------------------------------------------------------------
        console.error('Request Setup Error:', error.message);
        alert('An unexpected application error occurred.');
      }
    });
  }

  console.log("Persons: ", persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} />
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
        return (
          <div key={person.id}> 
            {person.name}  {person.number} 
            <button onClick={() => handleDeletePerson(person)}>delete</button> 
          </div>
        )
      }) }
    </div>
  )
}

export default App