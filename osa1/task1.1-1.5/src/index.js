import React from 'react'
import ReactDOM from 'react-dom'
// import { unstable_renderSubtreeIntoContainer } from 'react-dom'



const Header = (props) => {
  return (
    <div>
<h1>{props.header}</h1>
    </div>
  )
}
const Part = (props) => {
  return (
    <p>{props.part} {props.ex}</p>
  )
}

const Content = (props) => {
  return(
    <>
    <Part part={props.part1} ex={props.exercises1}></Part>
    <Part part={props.part2} ex={props.exercises2}></Part>
    <Part part={props.part3} ex={props.exercises3}></Part>
    </>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header={course.name}></Header>
      <Content
         part1={course.parts[0].name}
         part2={course.parts[1].name}
         part3={course.parts[2].name}
         exercises1={course.parts[0].exercises}
         exercises2={course.parts[1].exercises}
         exercises3={course.parts[2].exercises3}
      >
      </Content>
      <Total ex1={course.parts[0].exercises} ex2={course.parts[1].exercises} ex3={course.parts[2].exercises}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))