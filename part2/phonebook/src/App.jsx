import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '09443535455', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const personsToShow = query ?
    persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    persons

  const handleFormSubmit = evt => {
    evt.preventDefault()

    const newNameTrimmed = newName.trim()
    if (persons.some(p => p.name === newNameTrimmed)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const newNumberTrimmed = newNumber.trim()
    if (persons.some(p => p.number === newNumberTrimmed)) {
      alert(`The number ${newNumber} is already added`)
      return
    }

    setPersons(persons.concat({ name: newNameTrimmed, number: newNumberTrimmed }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={query} onChange={evt => setQuery(evt.target.value)} /></div>
      <h2>Add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={evt => setNewName(evt.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={evt => setNewNumber(evt.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(p => (<p key={p.name}>{p.name}: {p.number}</p>))}
    </div>
  )
}

export default App