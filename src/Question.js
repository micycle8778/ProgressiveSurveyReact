import React from 'react'
import Answer from './Answer.js';

function Question(props) {
  let {question} = props
  return (
    <div className="question">
      <input 
        type='text' 
        value={question.title} 
        placeholder="Question Title"
        onChange={e => {props.onChange(e.target.value, question.id)}}
        className="qtitle"
      /> <button className="delq delbtn btn" onClick={() => props.delQ(question.id)}>X</button>
      <ol className="answers" type="A">
        {question.answers.map(a => {
          return <li className="answer"><Answer 
            answer={a} 
            key={a.id}
            onChange={e => props.onAnswerChange(question.id, a.id, e.target.name, e.target.value)}
            delA={() => props.delA(question.id, a.id)}
          /></li>
        })}
      </ol>
      <button onClick={props.addA.bind(this, question.id)} className="addq addbtn btn">Add Answer</button> {' '}
    </div>
  )
}

export default Question
