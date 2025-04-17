import Course from './components/Course.jsx'


const Part = ({name, exercises}) => {
  return(
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({content}) => {

  const totalExercises = content.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return(
    <div>
      {content.map(part => <Part {...part} key={part.id}/>)}
      <b>total of {totalExercises} exercises</b>
    </div>
  )
}

const Header = ({header}) => {
  return(
    <>
      <h3>{header}</h3>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  );
};

export default App
export {Content, Header, Part};
