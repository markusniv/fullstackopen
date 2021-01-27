import React from "react";

const Header = (props) => {
    return (
        <>
            <h2>{props.course.name}</h2>
        </>
    )
}

const Content = (props) => {
    const { parts } = props;
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises}/>
            )}
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    )
}

const Total = (props) => {
    const { parts } = props;
    const total = parts.reduce((p, c) => {
        return p + c.exercises;
    }, 0);
    return (
        <>
            <p><b>Number of exercises {total}</b></p>
        </>
    )
}

const Course = (props) => {
    const { course } = props;

    return (
        <>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
    )
}

export default Course