const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./person")

const app = express()

app.use(cors())

app.use(express.json())

morgan.token("body", (req, res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.use(express.static("dist"))

app.get("/api/persons", (request, response) => {
  Person.find({}).then(r => {
    response.status(200)
    response.send(r)
  })
})

app.get("/info", (request, response) => {
  Person.find({}).then(r => {
    response.status(200)
    response.send(`There are ${r.length} people stored in the db`)
  })
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(r => {
    response.status(200)
    response.send(r)
  }).catch(e => {
    response.status(404)
    response.send(e.message)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(r =>{
    response.sendStatus(204)
  })
})

app.post("/api/persons", (request, response) => {
  const person = request.body

  if (!person.name || !person.number){
    response.status(400)
    response.send("A person object with name and number props are required")
    return
  }

  Person.exists({name: person.name}).then(exists => {
    if (exists){
      response.status(400)
      response.send("The name already exists")
      return
    }
    
    Person.create({name: person.name, number: person.number}).then(r => {
      response.status(201)
      response.send(r)
    })
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => "Server running on port " + PORT)