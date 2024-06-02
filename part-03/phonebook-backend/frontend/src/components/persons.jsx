import phoneService from '../services/phonebook'

const Persons = ({ persons, searchKey,setPersons }) => {
    const handleDelete = (person) => {
        const url = `http://localhost:3001/persons/${person.id}`

        if(window.confirm(`Delete ${person.name}`)) {
            phoneService
            .deletePerson(person.id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== person.id))
            })
        }

    }
    const arrPersons = persons.map(person => {
        if (person.name.toLowerCase().includes(searchKey.toLowerCase().trim())) {
            return (
                <div key={person.id}>
                    <p>{person.name} {person.number}</p> 
                    <button onClick={() => handleDelete(person)}>delete</button>
                </div>
            )
        }
        return null;
    })

    return (
        <>
            {arrPersons}
        </>
    )
}

export default Persons