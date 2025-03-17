const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
}

const Part = (props) => {

  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  );
}

const Content = ({course}) => {
  let parts = course.parts;
  let [part1, part2, part3] = parts;
  return (
    <>
      <Part part={part1}/>
      <Part part={part2}/>
      <Part part={part3}/>
    </>
  );
}

const Total = ({course}) => {
  return(
    <>
      <p>Number of exercises{" "}
        {course.parts[0].exercises+
         course.parts[1].exercises+
         course.parts[2].exercises
        }</p>
    </>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
