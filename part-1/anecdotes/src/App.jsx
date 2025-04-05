import { useState } from "react";
import "./index.css"

const AnecdotesVotes = ({voteIndex, votes}) =>{
  if(voteIndex in votes) {
    return (
      <>
        <p>has {votes[voteIndex]} votes</p>
      </>
    );
  }
  return<p>has 0 votes</p>

}
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  });

  function handleClick(){

    let randomNum = Math.floor(Math.random() * anecdotes.length)
    while(randomNum === selected){
      randomNum = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomNum)
  }

  const handleVotes = () => {
    let newVote = {
      ...votes,
    }
    newVote[selected] = votes[selected] + 1
    setVotes(newVote)
  }

  return (
    <div>
      {anecdotes[selected]}
      <AnecdotesVotes voteIndex={selected} votes={votes}/>

      <div className="button-div">

        <button onClick={handleVotes}>
          vote
        </button>
        <button onClick={handleClick} className="nextAnecdote">
          next anecdote
        </button>

      </div>
    </div>
  );
};

export default App;
