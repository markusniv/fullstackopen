import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
)

const StatisticLine = (props) => {
    return (
        <>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </>
    )
}
const Statistics = (props) => {
    const good = props.good;
    const neutral = props.neutral;
    const bad = props.bad;

    const all = good + neutral + bad;
    if (all > 0) {
        return (
            <table>
                <tbody>
                    <tr><StatisticLine text={"good"} value={good}/></tr>
                    <tr><StatisticLine text={"neutral"} value={neutral}/></tr>
                    <tr><StatisticLine text={"bad"} value={bad}/></tr>
                    <tr><StatisticLine text={"all"} value={all}/></tr>
                    <tr><StatisticLine text={"average"} value={(good + bad * -1) / all}/></tr>
                    <tr><StatisticLine text={"positive"} value={(good / all) * 100 + " %"}/></tr>
                </tbody>
            </table>
        )
    }
    else {
        return (
            <>
                <p>No feedback given</p>
            </>
        )
    }
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = newValue => {
        setGood(newValue)
    }

    const setToNeutral = newValue => {
        setNeutral(newValue)
    }

    const setToBad = newValue => {
        setBad(newValue)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setToGood(good + 1)} text="good"/>
            <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral"/>
            <Button handleClick={() => setToBad(bad + 1)} text="bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)