import phoneService from '../services/phonebook'

const PersonForm = ({ persons, setPersons, newPerson, setNewPerson, setMessage }) => {
  function handleAdd(e) {
    e.preventDefault()

    const existingPerson = persons.find(person => person.name === newPerson.name)

    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newPerson.number }

        phoneService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewPerson({ name: '', number: '' })
          })
          .catch(error => {

            setMessage(
              `Information of ${newPerson.name} has already been removed from the server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNotes(notes.filter(n => n.id !== id))
          })
      }
    } else {
      const personObj = {
        name: newPerson.name,
        number: newPerson.number
      }

      phoneService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewPerson({ name: '', number: '' })
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handlePersonNameChange = (event) => {
    setNewPerson({ name: event.target.value, number: newPerson.number })
  }

  const handlePersonNumChange = (event) => {
    setNewPerson({ name: newPerson.name, number: event.target.value })
  }

  return (
    <form onSubmit={handleAdd}>
      <div>
        name: <input value={newPerson.name} onChange={handlePersonNameChange} />
        <br />
        number: <input value={newPerson.number} onChange={handlePersonNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm