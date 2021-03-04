import axios from "axios";

const service = axios.create({
  baseURL: '/',
  withCredentials: true
})

export default service