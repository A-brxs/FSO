import React from 'react'

const Header = ({ course }) => {
console.log('const Header loaded')

  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
console.log('const Total loaded')
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
console.log('const Part loaded')
console.log('This is Part:',props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>    
  )
}

const Content = ({course}) => {
  
  console.log('const Content loaded')
  console.log('This is content props:',course)
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />        
      )}
    </div>
  )
}

const Course = (props) => {
console.log('const Course loaded')
console.log('This is course',props)

const { course } = props

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
    </div>
  )

}

const App = () => {
console.log('const App loaded')
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      }
    ]
  }

  return <Course course={course} />
}

export default App