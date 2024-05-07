const Persons = ({ persons, searchKey }) => {
    const arrPersons = persons.map(person => {
        if (person.name.toLowerCase().includes(searchKey.toLowerCase().trim())) {
            return <p key={person.name}>{person.name} {person.number}</p>
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