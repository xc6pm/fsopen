import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const getRandomInt = (max) => Math.floor(Math.random() * max)

const Anecdote = ({text, votes}) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </>
  )
}


const AnecdoteWithMostVotes = ({votes}) => {
  const highestVoted = votes.reduce((greatestIdx, curr, idx) => { 
    if (curr > votes[greatestIdx])
      greatestIdx = idx
    return greatestIdx
  }, 0) ?? 0

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[highestVoted]} votes={votes[highestVoted]}/>
    </>
  )
}

function App() {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const voteSelected = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={voteSelected} style={{marginRight: "5px"}}>vote</button>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>new anecdote</button>

      <AnecdoteWithMostVotes votes={votes}/>
    </>
  )
}

export default App
