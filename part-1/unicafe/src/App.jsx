import { useState } from "react";
import "./index.css"

const Title = () => <h2>give feedback</h2>

const Button = (props) => <button onClick={props.onClick}>{props.feedback}</button>

const StatisticLine = ({text, value}) => {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>{text}</td>
              <td>{value}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
}

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
            <StatisticLine text="good" value={goodCount}/>
            <StatisticLine text="neutral" value={neutralCount}/>
            <StatisticLine text="bad" value={badCount}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={total === 0 ? 0 : average}/>
            <StatisticLine text="positive" value={total === 0 ? 0 : positivePercentage + " %"}/>
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

        <Button feedback="good" onClick={() => setGood(good + 1)}/>
        <Button feedback="neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button feedback="bad" onClick={() => setBad(bad + 1)}/>

        <Statistics
            goodCount={good}
            neutralCount={neutral}
            badCount={bad}
        />

    </div>
    );

};

export default App;
