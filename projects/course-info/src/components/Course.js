import React from "react";
const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Footer = ({ total }) => {
  return (
    <>
      <b>Number of exercises {total}</b>
    </>
  );
};

const Course = ({ course }) => {
  const total = course.parts.reduce(
    (acc, current) => acc + current.exercises,
    0
  );
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Footer total={total} />
    </>
  );
};

export default Course;
