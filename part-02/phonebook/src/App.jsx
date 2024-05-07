import { useState } from 'react'

//componenet imports
import Filter from './componenets/filter'
import PersonForm from './componenets/personForm'
import Persons from './componenets/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchKey, setSearchKey] = useState('')


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