const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())

app.use(morgan("tiny"))

const data = [
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

app.get("/api/persons", (request, response) => {
  response.json(data)
})

app.get("/info", (request, response) => {
  response.send(`Phonebook has data info for ${data.length} people <br/> ${new Date()}`)
})

app.get("/api/persons/:id", (request, response) => {
  const person = data.find(p => p.id == request.params.id)

  if (person)
    response.json(person)
  else
    response.sendStatus(404)
})

app.delete("/api/persons/:id", (request, response) => {
  const index = data.findIndex(p => p.id === request.params.id)
  if (index !== -1)
    data.splice(index, 1)
  
  response.sendStatus(204)
})

const maxId = 100000000
app.post("/api/persons", (request, response) => {
  const person = request.body

  if (!person.name || !person.number){
    response.status(400)
    response.send("A person object with name and number props are required")
    return
  }

  if (data.some(p => p.name.localeCompare(person.name, "en", {sensitivity: "accent"}) === 0)) {
    response.status(400)
    response.send("The name already exists")
    return
  }

  person.id = Math.floor(Math.random() * maxId)
  data.push(person)
  response.status(201)
  response.json(person)
})

const PORT = 3001

app.listen(PORT, () => "Server running on port " + PORT)