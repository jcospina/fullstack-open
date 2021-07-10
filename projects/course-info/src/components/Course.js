import React from "react";
const Header = ({courseName}) => {
  return <h1>{courseName}</h1>;
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

const Footer = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
