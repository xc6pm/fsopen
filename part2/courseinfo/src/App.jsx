
function Header({course}) {
  return (
    <h1>{course.name}</h1>
  )
}

function Part({part}) {
  return (
    <p>
      {part.name}: {part.exercises} exercises
    </p>
  )
}

function Content({course}) {
  return (
    <div>
      {course.parts.map(p => (<Part part={p}/>))}
    </div>
  )
}


function Total({course}){
  return (
    <b>
      Total exercises: {course.parts.reduce(((sum, curr) => sum + curr.exercises), 0)}
    </b>
  )
}

function Course({course}){
  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map(c => (
        <>
          <Course key={c.id} course={c}/>
          <hr/>
        </>
      ))}
    </>
  )
}

export default App
