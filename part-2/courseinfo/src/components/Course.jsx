import {Header, Content} from '../App'

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
    </div>
  );
};

export default Course;
