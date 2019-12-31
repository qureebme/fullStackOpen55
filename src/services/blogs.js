import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const getAll = () => {
  return axios.get('http://localhost:3003' + baseUrl)
}

const login = (userData) => {
    const result = axios.post('http://localhost:3003/api/login', userData)
    return result.then(res => res.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
  //console.log('token::', token)
}

const createBlogNote = (body) => {
  const config = {
    headers: { Authorization: token }
  }
  const result = axios.post('http://localhost:3003' + baseUrl, body, config)
  return result.then(res => res.data)
}

const updateLike = (id, body) => {
  const config = {
    headers: { Authorization: token }
  }
  const result = axios.patch('http://localhost:3003' + baseUrl + id, body, config)
  return result.then(res => res.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const result = axios.delete('http://localhost:3003'+ baseUrl + id, config)
  return result.then(res => res.data)
}

export default { getAll, login, setToken, createBlogNote, updateLike, deleteBlog }