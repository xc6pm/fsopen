import axios from "axios"
import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  })

  const personsToShow = query ?
    persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    persons

  const handlePersonCreated = (name, number) => {
    setPersons(persons.concat({ name: name, number: number }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} onQueryChanged={evt => setQuery(evt.target.value)}/>
      <h2>Add a new</h2>
      <PersonForm onPersonCreated={handlePersonCreated} existingPersons={persons}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App