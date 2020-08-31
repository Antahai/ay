import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const votes = new Uint8Array(6);
const votesCopy = [...votes];



const App = (props) => {
  const startAd = Math.floor(Math.random() * 6);
  const [selected, setSelected] = useState(startAd);
  const [voted, setVoted] = useState(null);
  let greatestValue = votesCopy.indexOf(Math.max(...votesCopy));
  console.log(greatestValue);

  return (
    <div>
    <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        <button onClick={() => {
          
          setSelected(Math.floor(Math.random() * 6))
          setVoted(null);
          }}>
        Next anecdote
      </button>

      <button onClick={() => {
            
            if(voted === null) {
              votesCopy[selected] += 1;
              setVoted(<p>You have voted!</p>);
              } else { setVoted(<p>You have already voted!</p>);}
            console.log(votesCopy); 
           
            }
            }>
        Vote 
      </button>
      {voted}
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[greatestValue]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)