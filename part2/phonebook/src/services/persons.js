import axios from "axios"

const getAll = () => {
    const promise = axios.get("http://localhost:3001/persons")
    return promise.then(p => p.data)
}

const create = (newPerson) => {
    const promise = axios.post("http://localhost:3001/persons", newPerson)
    return promise.then(p => p.data)
}

export default {
    getAll,
    create
}