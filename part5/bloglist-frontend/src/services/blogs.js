import axios from 'axios'

const baseUrl = '/api/blogs'

let token = ""

const setToken = (newToken) => token = newToken

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const patch = (id, blogPatch) => {
  return axios.patch(`/api/blogs/${id.toString()}`, blogPatch)
}

const remove = (id) => {
  return axios.delete(`/api/blogs/${id.toString()}`, {headers: {Authorization: `Bearer ${token}`}})
}

export default { setToken, getAll, patch, remove }