const express = require('express')
const app = express()


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// http://localhost:3001/api/persons 
app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/info", (request, response) => {
  let content = `Phonebook has info for ${persons.length} people \n${new Date()}`
  response.send(content)
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  if(person) {
    res.json(person).statusCode(200)
  } else {
    res.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Express server running at PORT ${PORT}`)
})