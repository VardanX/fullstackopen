function Part({part, exercise}){
    return (
      <>
        <p>{part} {exercise}</p>
      </>
    );
}


function Header({courseName}){
    return(
        <>
            <h1>{courseName.course}</h1>
        </>
    );
}

function Content({part}){
    return (
      <>
        <Part part={part.parts[0].name} exercise={part.parts[0].exercises} />
        <Part part={part.parts[1].name} exercise={part.parts[1].exercises} />
        <Part part={part.parts[2].name} exercise={part.parts[2].exercises} />
      </>
    );
}

function Total({total}){
    return (
      <>
        <p>
          Number of exercises{" "}
          {total.parts[0].exercises + total.parts[1].exercises + total.parts[2].exercises}
        </p>
      </>
    );
}


const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course} />
      <Content part={course}/>
      <Total total={course}/>
    </div>
  );
};

export default App;
