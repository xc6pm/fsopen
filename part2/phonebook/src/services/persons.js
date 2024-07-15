import axios from "axios"

const getAll = () => {
    const promise = axios.get("http://localhost:3001/persons")
    return promise.then(r => r.data)
}

const create = (newPerson) => {
    const promise = axios.post("http://localhost:3001/persons", newPerson)
    return promise.then(r => r.data)
}

const update = personToUpdate => {
    const promise = axios.put(`http://localhost:3001/persons/${personToUpdate.id}`, personToUpdate)
    return promise.then(r => r.data)
}

const remove = id => {
    const promise = axios.delete(`http://localhost:3001/persons/${id}`)
    return promise.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    remove
}