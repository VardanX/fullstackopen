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

  return (
    <div>
      <Header course={course}/>

      <Content
        part1={part1.name}
        part1exercises={part1.exercises}
        part2={part2.name}
        part2exercises={part2.exercises}
        part3={part3.name}
        part3exercises={part3.exercises}
      />

      <Total total={part1.exercises + part2.exercises +part3.exercises}/>
    </div>
  )
}

export default App
