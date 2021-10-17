import React, { useState } from 'react'

const Statistics = (props) => {
  console.log(props)
  if (props.good === 0 & props.bad === 0 & props.neutral === 0) {
    return (
      <div>
        <h2> Statistics </h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2> Statistics </h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value ={props.good} />
            <StatisticLine text="Neutral" value ={props.neutral} />
            <StatisticLine text="Bad" value ={props.bad} />
            <StatisticLine text="All" value ={props.all} />
            <StatisticLine text="Average" value ={props.average} />
            <StatisticLine text="Positive" value = {props.positivef + "%"} />
          </tbody>
        </table>
    </div>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  console.log('const APP loaded')
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBad = () => {
    setBad(bad + 1)
  }

  let all = good + bad + neutral
  let average = (good - bad) / all
  let positivef = 100 * (good / all)

  
  return (
    <div>
      <h2> Give Feedback </h2>
        <p>
          <Button handleClick={handleGood} text='good' />
          <Button handleClick={handleNeutral} text='neutral' />
          <Button handleClick={handleBad} text='bad' />
        </p>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positivef={positivef}/>
    </div>
  )
}

export default App