import React, { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);
const App = (props) => {
  const [counter, setCounter] = useState(0); // the param in useState is the initial value

  // const increaseByOne = () => setCounter(counter + 1);
  // const decreaseByOne = () => setCounter(counter - 1);
  // const resetCounter = () => setCounter(0);

  const changeCounter = (newValue) => () => setCounter(newValue);

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={changeCounter(counter + 1)} text="plus" />
      <Button handleClick={changeCounter(0)} text="reset" />
      <Button handleClick={changeCounter(counter - 1)} text="minus" />
    </>
  );
};

export default App;
