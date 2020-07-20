import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3333" //so colocamos uma vez a base 
})          

export default api