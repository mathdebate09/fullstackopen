import { useState, useEffect } from 'react'
import axios from 'axios'

//componenet imports
import Filter from './componenets/filter'
import PersonForm from './componenets/personForm'
import Persons from './componenets/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchKey={searchKey} setSearchKey={setSearchKey} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newPerson={newPerson} setNewPerson={setNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchKey={searchKey} />
    </div>
  )
}

export default App