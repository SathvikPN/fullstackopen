import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createPerson = (personObj) => {
    return axios.post(baseURL, personObj)
    .then(response => response.data)
}

const deletePerson = (personID) => {
    const deleteURL = `${baseURL}/${personID}` // note: how to handle if url itself was wrong
    return axios.delete(deleteURL)
    .then(response => response)
}


export default { getAll, createPerson, deletePerson }