import { useState } from "react"
import personsService from "./services/persons"

const PersonForm = ({ onPersonCreated, existingPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleFormSubmit = evt => {
        evt.preventDefault()

        const nameTrimmed = newName.trim()                                     
        if (existingPersons.some(p => p.name === nameTrimmed)) {
            alert(`${newName} is already added to the phonebook`)
            return
        }
        const numberTrimmed = newNumber.trim()
        if (existingPersons.some(p => p.number === numberTrimmed)) {
            alert(`The number ${newNumber} is already added`)
            return
        }

        personsService.create({ name: nameTrimmed, number: numberTrimmed })
            .then(() => {
                onPersonCreated(nameTrimmed, numberTrimmed)
                setNewName("")
                setNewNumber("")
            })
            .catch(error => alert(error))
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