const express = require('express')
const app = express()
// FIX: This middleware is REQUIRED to parse JSON content 
// from the request body (req.body will no longer be undefined).
app.use(express.json())

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

app.post("/api/persons", (req, res) => {
  const body = req.body
  console.log("Received body:", body); // Will no longer be undefined

  if(!body || !body.name || !body.number) {
    return res.status(400).end("name/number missing")
  }

  if(persons.some(person => person.name === body.name)) {
    return res.status(409).json({ error: 'name must be unique' })
  }

  const person = {
    id: crypto.randomUUID(),
    name: body.name || 'no name',
    number: String(body.number)
  }

  persons = persons.concat(person)
  console.log(persons)
  res.status(200).json(person)
  
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Express server running at PORT ${PORT}`)
})