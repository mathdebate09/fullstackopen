import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'

const BirthYearForm = () => {
    const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')
  const [selectedName, setSelectedName] = useState(null)

  const [ changeBirthyear, result ] = useMutation(EDIT_BORN, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    refetchQueries: [ {query: ALL_AUTHORS } ]
  })

  const resultAuthor = useQuery(ALL_AUTHORS)

  const options = []
  resultAuthor.data?.allAuthors.forEach(author => options.push(
      {
        value: author.name,
        label: author.name
    }))

  const submit = (event) => {
    event.preventDefault()

    const name = selectedName.value

    changeBirthyear({ variables: { name, setBornTo } })
    setSelectedName(null)
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
      <div>
          <Select
            value={selectedName}
            onChange={setSelectedName}
            options={options}
          />
        </div>
        <div>
          born <input
            value={setBornTo}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm