import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const Statistic = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  if (total > 0) {
    return (
      <table>
        <tbody>
          <Statistic label="Good" value={good} />
          <Statistic label="Neutral" value={neutral} />
          <Statistic label="Bad" value={bad} />
          <Statistic label="Total" value={total} />
          <Statistic label="Average" value={average} />
          <Statistic label="Positive" value={`${positive}%`} />
        </tbody>
      </table>
    );
  }
  return <div>No feedback given</div>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveGoodFeedback = () => setGood(good + 1);
  const giveNeutralFeedback = () => setNeutral(neutral + 1);
  const giveBadFeedback = () => setBad(bad + 1);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text="good" handleClick={giveGoodFeedback} />
      <Button text="neutral" handleClick={giveNeutralFeedback} />
      <Button text="bad" handleClick={giveBadFeedback} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
