import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const Votes = (props) => {
    return(
        <>
            <h2>has {props.votes} votes</h2>
        </>
    )
}

const MostVotes = (props) => {
    return(
        <>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdote}</p>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [voted, setVoted] = useState(0);

    const setToSelected = newValue => {
        setSelected(newValue);
        setToVoted(newValue)
    }

    const setToVoted = newValue => {
        const voteCopy = [...props.votes];
        setVoted(voteCopy[newValue])
    }

    const addVote = () => {
        props.votes[selected] += 1;
        setToVoted(selected)
    }
    let mostVotedIndex = 0;
    for (let i = 0; i < props.votes.length; i++) {
        if (props.votes[i] > props.votes[mostVotedIndex]) {
            mostVotedIndex = i;
        }
    }
    const mostVoted = anecdotes[mostVotedIndex];
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <h2>{props.anecdotes[selected]}</h2>
            <Votes votes={voted}/>
            <Button handleClick={() => addVote()} text={"vote"}/>
            <Button handleClick={() => setToSelected(Math.floor(Math.random() * props.anecdotes.length))} text={"next anecdote"}/>
            <MostVotes anecdote={mostVoted}/>
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

const points = new Array(anecdotes.length).fill(0);

ReactDOM.render(
    <App anecdotes={anecdotes} votes={points}/>,
  document.getElementById('root')
);
