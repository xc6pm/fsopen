import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '09443535455', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [query, setQuery] = useState('')

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