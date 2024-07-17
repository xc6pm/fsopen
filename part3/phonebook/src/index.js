const express = require("express")

const app = express()

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

const PORT = 3001

app.listen(PORT, () => "Server running on port " + PORT)