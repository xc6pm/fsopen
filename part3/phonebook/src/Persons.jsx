import personsService from "./services/persons"

const Persons = ({ personsToShow, onPersonDeleted }) => {

    const handleDeleteClicked = (person) => {
        if (!window.confirm(`Delete ${person.name}?`))
            return

        personsService.remove(person.id)
            .then(deletedPerson => {
                onPersonDeleted(deletedPerson)
            })
    }

    return personsToShow.map(p => (
        <p key={p.name}>
            {p.name}: {p.number} <button onClick={() => handleDeleteClicked(p)}>delete</button>
        </p>
    ))
}

export default Persons