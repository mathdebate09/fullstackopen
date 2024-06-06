import {ALL_AUTHORS} from '../queries'
import {useQuery} from '@apollo/client'
import BirthYearForm from "./BirthYearForm";

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data?.allAuthors
  // ? optional chaining operator, helps in reading data, only reads when it is defined value (not-null)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm />
    </div>
  )
}

export default Authors