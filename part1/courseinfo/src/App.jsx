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
      <p>{part.name} {exercise.exercises}</p>
    </>
  );
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} exercise={props.parts[0]}/>
      <Part part={props.parts[1]} exercise={props.parts[1]}/>
      <Part part={props.parts[2]} exercise={props.parts[2]}/>
    </>
  );
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises{" "}
        {props.total[0].exercises+
         props.total[1].exercises+
         props.total[2].exercises
        }</p>
    </>
  );
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
      <Content parts={parts}/>
      <Total total={parts}/>
    </div>
  )
}

export default App
