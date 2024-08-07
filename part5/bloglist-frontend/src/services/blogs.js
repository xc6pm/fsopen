import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const patch = (id, blogPatch) => {
  return axios.patch(`/api/blogs/${id.toString()}`, blogPatch)
}

export default { getAll, patch }