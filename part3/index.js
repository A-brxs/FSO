const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

let infoMsg = `
  <div>
    <p>There are ${persons.length} people</p>
    <p>${Date()}</p>
  </div>
  `

const getId = (maxId) => {
  return Math.floor(Math.random() * maxId)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(infoMsg)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) {
    response.status(404).end()
  } else {
    response.json(person)
  }

})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('this is body: ',body)
  if (!body.name) {
    return response.status(400).json({
      error: 'Name Missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'Number Missing'
    })
  } else if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'Name already exists'
    })
  }

 const person = {
   name: body.name,
   number: body.number,
   id: getId(16000)
 }
 console.log('this is person: ',person)

 persons = persons.concat(person)

  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})