import React from 'react';

// Header component is fine. It correctly receives 'course' and uses it.
const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1> {props.course} </h1>
    </>
  )
}

// FIX: The Part component now expects a single 'part' object 
// and correctly extracts the 'name' and 'exercises' properties from it.
const Part = (props) => {
  // Use props.part.name and props.part.exercises
  return (
    <p> {props.part.name} {props.part.exercises} </p>
  )
}

const Content = (props) => {
  console.log(props)

  const parts = props.parts 
  return (
    <>
      {/* FIX 3 (Iteration): Iterate over the 'parts' array using map(). 
        For each part object, render a 'Part' component, passing the 
        individual 'part' object as a prop.
      */}
      {parts.map((partItem, index) => (
        <Part key={index} part={partItem} />
      ))}
    </>
  )
}

const Total = (props) => {
  console.log(props)

  const parts = props.parts
  // Use the Array.prototype.reduce() method to calculate the sum.
  // The first argument (acc) is the accumulated total (starting at 0), 
  // and the second argument (part) is the current object in the array.
  const totalExercises = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0); // The '0' initializes the accumulator (acc)

  return (
    <p> Total number of exercises: {totalExercises} </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course}/>

      {/* passed entire array  */}
      <Content parts={parts}/>

      <Total parts={parts}/>


    </div>
  )
}

export default App
