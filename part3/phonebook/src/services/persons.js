import axios from "axios"

const baseUrl = "/api/persons"

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(r => r.data)
}

const create = (newPerson) => {
    const promise = axios.post(baseUrl, newPerson)
    return promise.then(r => r.data)
}

const update = personToUpdate => {
    const promise = axios.put(baseUrl, personToUpdate)
    return promise.then(r => r.data)
}

const remove = id => {
    const promise = axios.delete(`${baseUrl}/${id}`)
    return promise.then(response => {
        return response.status === 204
    })
}

export default {
    getAll,
    create,
    update,
    remove
}