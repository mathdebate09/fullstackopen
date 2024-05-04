const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({heading}) => {
    return (
      <>
        <h1>{heading}</h1>
      </>
    )
  }

  const Part = ({eachPart, eachExcersise}) => {
    return (
      <>
        <p>{eachPart} {eachExcersise}</p>
      </>
    )
  }

  const Content = ({parts}) => {
  return (
    <>
      <Part eachPart={parts[0].name} eachExcersise={parts[0].exercises} />
      <Part eachPart={parts[1].name} eachExcersise={parts[1].exercises} />
      <Part eachPart={parts[2].name} eachExcersise={parts[2].exercises} />
    </>
  )
}

  const Total= ({parts}) => {
    return (
      <>
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </>
    )
  }

  return (
    <div>
      <Header
        heading={course.name}
      />
      <Content
        parts= {course.parts}
      />
      <Total
        parts={course.parts}
      />
    </div>
  )
}

export default App