import React, { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h2> Statistics </h2>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
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

  return (
    <div>
      <h2> Give Feedback </h2>
        <p>
          <Button handleClick={handleGood} text='good' />
          <Button handleClick={handleNeutral} text='neutral' />
          <Button handleClick={handleBad} text='bad' />
        </p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App