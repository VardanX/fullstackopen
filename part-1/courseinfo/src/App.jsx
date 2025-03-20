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
            <h1>{courseName}</h1>
        </>
    );
}

function Content({parts}){
    return (
      <>
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
      </>
    );
}

function Total({total}){
    return (
      <>
        <p>
          Number of exercises{" "}
          {total[0].exercises + total[1].exercises + total[2].exercises}
        </p>
      </>
    );
}


const App = () => {
  const course = "Half Stack application development";
  const parts = [
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
  ];

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts}/>
      <Total total={parts}/>
    </div>
  );
};

export default App;
