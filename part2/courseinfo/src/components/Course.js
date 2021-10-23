const Header = ({ course }) => {
  console.log('const Header loaded')

  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {

  console.log('const Content loaded')
  console.log('This is content props:', course)
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Part = (props) => {
  console.log('const Part loaded')
  console.log('This is Part:', props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Total = ({ course }) => {
  console.log('const Total loaded')

  let totalExercises = course.parts.reduce((s, p) => {
    return (
      console.log('log', s, p.exercises),
      s + p.exercises
    )
  }, 0)

  return (
    <p><b>Number of exercises {totalExercises}</b></p>
  )
}

const Course = (props) => {
  console.log('const Course loaded')
  console.log('This is course', props)

  const { course } = props

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course