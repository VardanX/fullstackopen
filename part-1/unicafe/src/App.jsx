import { useState } from "react";


const Title = () => <h2>give feedback</h2>

const Button = (props) => <button onClick={props.onClick}>{props.name}</button>

const Statistics = ({goodCount, neutralCount, badCount}) => {
  return (
    <>
      <h2>statistics</h2>
      <p>good {goodCount}</p>
      <p>neutral {neutralCount}</p>
      <p>bad {badCount}</p>
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title />

      <Button name="good" onClick={() => setGood(good + 1)} />
      <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" onClick={() => setBad(bad + 1)} />

      <Statistics
        goodCount={good}
        neutralCount={neutral}
        badCount={bad} />
    </div>
  );

};

export default App;
