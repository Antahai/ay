import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticsLine = (props) => {
  return(
  <>
    <tr><th>{props.text}</th><th>{props.value}</th></tr>
  </>
  )
}

const Statistics = (props) => {
  let all = (props.bad + props.good + props.neutral);
  const tableStyle = {
    textAlign: 'left',
    padding: '10px',
  };
  if(props.bad !== 0 | props.good !== 0 | props.neutral !== 0){
  return(
    <>
      <h1>Statistics:</h1>
      <table style={tableStyle}>
        <tbody>
          <StatisticsLine text="Good" value = {props.good}></StatisticsLine>
          <StatisticsLine text="Neutral" value = {props.neutral}></StatisticsLine>
          <StatisticsLine text="Bad" value = {props.bad}></StatisticsLine>
          <StatisticsLine text="All" value = {all}></StatisticsLine>
          <StatisticsLine text="Average" value = {((props.good - props.bad)/(all)).toFixed(2)}></StatisticsLine>
          <StatisticsLine text="Positive" value = {(props.good/(all)*100).toFixed(1) + " %"}></StatisticsLine>
        </tbody>
      </table>
     
  </>
  )}
  return(
    <>
    <h1>Statistics:</h1>
    <p>Add some data to make calcs</p>
    </>
  )
}
const Button = (props) => {
  return(
    <>
     <button onClick={() => props.setGood(props.good + 1)}>
        Good
      </button>
      <button onClick={() => props.setNeutral(props.neutral + 1)}>
        Neutral
      </button>
      <button onClick={() => props.setBad(props.bad + 1)}>
        Bad
      </button>
    </>
  )
}

const App = (props) => {
  const [ good, setGood ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)

  return (
    <div>
      <h1>Give feedback!</h1>
    <Button 
      good={good} 
      bad={bad} 
      neutral={neutral}
      setGood = {setGood}
      setBad = {setBad}
      setNeutral={setNeutral}
    ></Button>
 
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)