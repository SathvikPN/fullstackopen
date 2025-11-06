const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1> {props.course} </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p> {props.part} {props.exercise} </p>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  const part = props.part
  return (
    <>
      <Part part={part.name} exercise={part.exercises} />
    </>
  )
}

const Total = (props) => {
  const parts = props.parts
  
  // Use the Array.prototype.reduce() method to calculate the sum.
  // The first argument (acc) is the accumulated total (starting at 0), 
  // and the second argument (part) is the current object in the array.
  const totalExercises = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0); // The '0' initializes the accumulator (acc)
  
  return (
    <p className="font-bold mt-4">
      Total number of exercises: {totalExercises}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]
  return (
    <div>
      <Header course={course}/>
      <Content part={part1}/>
      <Content part={part2}/>
      <Content part={part3}/>
      <Total parts={parts} />
    </div>
  )
}

export default App