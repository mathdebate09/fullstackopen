const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong>total of {sum} excersises</strong>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <Part part={part} key={part.id} />
      ))}
    </>
  )
}

const Course = ({ courses }) => {
  const arrCourses = courses.map(course => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  ))

  return (
    <>
      {arrCourses}
    </>
  )
}

export default Course