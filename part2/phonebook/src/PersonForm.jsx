import { useState } from "react"
import personsService from "./services/persons"

const PersonForm = ({ onPersonCreated, existingPersons, onPersonUpdated }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const createPerson = (newNameTrimmed, newNumberTrimmed) => {
        personsService.create({ name: newNameTrimmed, number: newNumberTrimmed })
            .then(() => {
                onPersonCreated(newNameTrimmed, newNumberTrimmed)
                setNewName("")
                setNewNumber("")
            })
            .catch(error => alert(error))
    }

    const updatePerson = (personToUpdate, newNumberTrimmed) => {
        if (!window.confirm(
            `${personToUpdate.name} is already added to the phonebook,` +
            ` do you want to replace the old number with the new one?`))
            return
        
        personsService.update({...personToUpdate, number: newNumberTrimmed})
            .then(updatedPerson => {
                onPersonUpdated(updatedPerson)
                setNewName("")
                setNewNumber("")
            })
    }

    const handleFormSubmit = evt => {
        evt.preventDefault()

        const nameTrimmed = newName.trim()
        const personByTypedName = existingPersons.find(p => p.name === nameTrimmed)
        const numberTrimmed = newNumber.trim()
        if (personByTypedName) {
            if (numberTrimmed !== personByTypedName.number) {
                updatePerson(personByTypedName, numberTrimmed)
                return
            }

            alert(`${newName} is already added to the phonebook`)
            return
        }
        if (existingPersons.some(p => p.number === numberTrimmed)) {
            alert(`The number ${newNumber} is already added`)
            return
        }

        createPerson(nameTrimmed, numberTrimmed)
    }

    return (
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
    )
}

export default PersonForm