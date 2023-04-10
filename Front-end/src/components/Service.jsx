import axios from "axios"

// Config the Http request
export const BaseUrl = "http://localhost:8090/"

export const apiGet = async path => axios.get(`${BaseUrl}${path}`);

export const apiPost = async (path, data) => axios.post(`${BaseUrl}${path}`, data)

export const auth = () => {
  if (localStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}