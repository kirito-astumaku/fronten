import axios from "axios";


const instance = axios.create({
  baseURL: 'https://basededatos-production-66c6.up.railway.app/api/',
  withCredentials: true,
});

export default instance;