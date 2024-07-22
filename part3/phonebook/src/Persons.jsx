import personsService from "./services/persons"

const Persons = ({ personsToShow, onPersonDeleted }) => {

    const handleDeleteClicked = (person) => {
        if (!window.confirm(`Delete ${person.name}?`))
            return

        personsService.remove(person.id)
            .then(success => {
                if (success)
                    onPersonDeleted(person)
                else
                    onPersonDeleted(null)
            })
    }

    return personsToShow.map(p => (
        <p key={p.name}>
            {p.name}: {p.number} <button onClick={() => handleDeleteClicked(p)}>delete</button>
        </p>
    ))
}

export default Persons