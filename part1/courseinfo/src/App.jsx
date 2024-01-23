const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
}

const Part = ({part, exercise}) => {
  return (
    <>
      <p>{part} {exercise}</p>
    </>
  );
}

const Content = ({
  part1,
  part1exercises,
  part2,
  part2exercises,
  part3,
  part3exercises
}) => {
  return (
    <>
      <Part part={part1} exercise={part1exercises}/>
      <Part part={part2} exercise={part2exercises}/>
      <Part part={part3} exercise={part3exercises}/>
    </>
  );
}

const Total = ({total}) => {
  return(
    <>
      <p>Number of exercises {total}</p>
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

  return (
    <div>
      <Header course={course}/>

      <Content
        part1={part1}
        part1exercises={exercises1}
        part2={part2}
        part2exercises={exercises2}
        part3={part3}
        part3exercises={exercises3}
      />

      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
