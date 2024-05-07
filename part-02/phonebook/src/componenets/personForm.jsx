const PersonForm = ({persons, setPersons, newPerson, setNewPerson}) => {
    function handleAdd(e) {
        e.preventDefault()
        if (persons.some(person => person.name === newPerson.name)) {
          alert(`${newPerson.name} is already added to phonebook.`)
          return
        }
    
        const copy = [...persons]
        copy.push({
          name: newPerson.name,
          number: newPerson.number
        })
    
        setPersons(copy)
        setNewPerson({ name: '', number: '' })
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