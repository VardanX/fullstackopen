import { useState } from "react";
import "./index.css"

const Title = () => <h2>give feedback</h2>

const Button = (props) => <button onClick={props.onClick}>{props.name}</button>

const Statistics = props => {

    let {goodCount, neutralCount, badCount} = props

    let total = goodCount + neutralCount + badCount
    let average = (goodCount - badCount) / total
    let positivePercentage = (goodCount / total) * 100

    if(!total){
        return(
            <>
                <h2>statistics</h2>
                <h3>No feedback given</h3>
            </>
        )
    }
    return (
    <>
        <h2>statistics</h2>
        <ul style={{listStyleType:"none"}}>
        <li>good {goodCount}</li>
        <li>neutral {neutralCount}</li>
        <li>bad {badCount}</li>
        <li>all {total}</li>
        <li>average {total === 0 ? 0 : average}</li>
        <li>positive {total === 0 ? 0 : positivePercentage} %</li>
        </ul>
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

        <Button name="good" onClick={() => setGood(good + 1)}/>
        <Button name="neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button name="bad" onClick={() => setBad(bad + 1)}/>

        <Statistics
        goodCount={good}
        neutralCount={neutral}
        badCount={bad}
        />

    </div>
    );

};

export default App;
