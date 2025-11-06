const Header = (props) => {
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
  const parts = props.parts 
  const exercises = props.exercises

  return (
    <>
      <Part part={parts[0]} exercise={exercises[0]} />
      <Part part={parts[1]} exercise={exercises[1]} />
      <Part part={parts[2]} exercise={exercises[2]} />
    </>
  )
}

const Total = (props) => {
  const numbersArray = props.numbers;
  const totalSum = numbersArray.reduce((accumulator, currentValue) => {
    // For each item, add the currentValue to the accumulator (running total)
    return accumulator + currentValue; 
  }, 0); // The '0' is the initial value of the accumulator

  return (
    <>
      <p>Number of exercises {totalSum}</p>
    </>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const exercises = [exercises1, exercises2, exercises3]
  const parts = [part1, part2, part3]
  return (
    <>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises} />
      <Total numbers={exercises} />
    </>
  )
}

export default App