import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const response = request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  const response = request
  return response.data
}


//korjaa response try catch
const deleteBlog = async(id) => {
  const config = {
    headers: { Authorization: token }
  }

  try{
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.status
  }
  catch(error){
    return error.response.status
  }

}


export default { getAll, create, update, setToken, deleteBlog }