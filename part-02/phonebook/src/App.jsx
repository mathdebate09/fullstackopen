import { useState, useEffect } from 'react'
import phoneService from './services/phonebook'

//componenet imports
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchKey, setSearchKey] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchKey={searchKey} setSearchKey={setSearchKey} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newPerson={newPerson} setNewPerson={setNewPerson} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchKey={searchKey} setPersons={setPersons}/>
    </div>
  )
}

export default App