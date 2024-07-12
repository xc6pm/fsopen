
function Header({ course }) {
  return (
    <h1>{course.name}</h1>
  )
}

function Part({ part }) {
  return (
    <p>
      {part.name}: {part.exercises} exercises
    </p>
  )
}

function Content({ course }) {
  return (
    <div>
      {course.parts.map(p => (<Part key={p.id} part={p} />))}
    </div>
  )
}


function Total({ course }) {
  return (
    <b>
      Total exercises: {course.parts.reduce(((sum, curr) => sum + curr.exercises), 0)}
    </b>
  )
}

function Course({ course }) {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course