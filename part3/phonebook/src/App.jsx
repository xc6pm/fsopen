import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])

  const personsToShow = query ?
    persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    persons

  const handlePersonCreated = (createdPerson) => {
    setPersons(persons.concat(createdPerson))
  }

  const handlePersonUpdated = updatedPerson => {
    setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
  }

  const handlePersonDeleted = deletedPerson => {
    if (deletedPerson)
      setPersons(persons.filter(p => p.id !== deletedPerson.id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} onQueryChanged={evt => setQuery(evt.target.value)}/>
      <h2>Add a new</h2>
      <PersonForm onPersonCreated={handlePersonCreated} existingPersons={persons} onPersonUpdated={handlePersonUpdated}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onPersonDeleted={handlePersonDeleted}/>
    </div>
  )
}

export default App