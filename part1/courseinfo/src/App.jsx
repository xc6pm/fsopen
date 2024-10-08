
function Header({course}) {
  return (
    <h1>{course.title}</h1>
  )
}

function Part({part}) {
  return (
    <p>
      {part.name}: {part.extercises} exercises
    </p>
  )
}

function Content({course}) {
  return (
    <div>
      <Part part={course.parts[0]}/>
      <Part part={course.parts[1]}/>
      <Part part={course.parts[2]}/>
    </div>
  )
}


function Total({course}){
  console.log(course.parts)
  console.log(course)
  return (
    <p>
      Total exercises: {course.parts.reduce(((sum, curr) => sum + curr.extercises), 0)}
    </p>
  )
}

function App() {
  const courseInfo = {
    title: "Half stack web development",
    parts: [
      {
        name: "Fundamentals of react",
        extercises: 10
      },
      {
        name: "Using props to pass data",
        extercises: 7
      },
      {
        name: "State of a component",
        extercises: 14
      },
    ]
  }

  return (
    <>
      <Header course={courseInfo}/>
      <Content course={courseInfo}/>
      <hr/>
      <Total course={courseInfo}/>
    </>
  )
}

export default App
