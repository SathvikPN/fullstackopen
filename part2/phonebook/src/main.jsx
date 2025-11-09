import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import axios from 'axios'

// moved to App component
// const promise = axios.get('http://localhost:3001/notes')
// promise.then(response => {
//   console.log(response)
// })

// axios.get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     console.log(notes)
//   })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

createRoot(document.getElementById('root')).render(<App />)
