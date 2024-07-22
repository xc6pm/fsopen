import { useState } from "react"
import personsService from "./services/persons"
import Notification from "./Notification"

const PersonForm = ({ onPersonCreated, existingPersons, onPersonUpdated }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [message, setMessage] = useState(null)

    const showMessage = message => {
        setMessage(message)
        setTimeout(() => setMessage(null), 5000)
    }

    const createPerson = (newNameTrimmed, newNumberTrimmed) => {
        personsService.create({ name: newNameTrimmed, number: newNumberTrimmed })
            .then(createdPerson => {
                onPersonCreated(createdPerson)
                showMessage({ text: `Added ${createdPerson.name}`, type: "success" })
                setNewName("")
                setNewNumber("")
            })
            .catch(error => {showMessage({text: error.response.data.error, type: "error"})})
    }

    const updatePerson = (personToUpdate, newNumberTrimmed) => {
        if (!window.confirm(
            `${personToUpdate.name} is already added to the phonebook,` +
            ` do you want to replace the old number with the new one?`))
            return

        personsService.update({ ...personToUpdate, number: newNumberTrimmed })
            .then(updatedPerson => {
                onPersonUpdated(updatedPerson)
                showMessage({ text: `Updated ${updatedPerson.name}!`, type: "success" })
                setNewName("")
                setNewNumber("")
            })
            .catch(error => {
                showMessage({
                    text: error.response.data.error,
                    type: "error"
                })
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

            showMessage({ text: `${newName} is already added to the phonebook`, type: "error" })
            return
        }
        if (existingPersons.some(p => p.number === numberTrimmed)) {
            showMessage({ text: `The number ${newNumber} is already added`, type: "error" })
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

            <Notification message={message} />
        </form>
    )
}

export default PersonForm