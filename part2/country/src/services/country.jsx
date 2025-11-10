import axios from "axios";
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    const URL = `${baseURL}/api/all`
    const request = axios.get(URL)
    return request.then(response => response.data)
}

// const createPerson = (personObj) => {
//     return axios.post(baseURL, personObj)
//     .then(response => response.data)
// }

// const deletePerson = (personID) => {
//     const deleteURL = `${baseURL}/${personID}` // note: how to handle if url itself was wrong
//     return axios.delete(deleteURL)
//     .then(response => response)
// }


export default { getAll }