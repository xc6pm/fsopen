import { useState } from "react"
import "./app.css"

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const pointsEarned = good + (bad * -1)
  const average = pointsEarned / all
  const positiveRatio = good / all

  console.log(good | neutral | bad)

  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positiveRatio}/>
    </>
  )
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App