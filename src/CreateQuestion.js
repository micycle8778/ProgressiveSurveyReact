import React from 'react'
import CreateAnswer from './CreateAnswer.js';

function CreateQuestion(props) {
  let {question} = props
  return (
    <div className="create-question">
      <input 
        type='text' 
        value={question.title} 
        placeholder="Question Title"
        onChange={e => {props.onChange(e.target.value, question.id)}}
        className="create-qtitle"
      /> <button className="delq delbtn btn" onClick={() => props.delQ(question.id)}>X</button>
      <ol className="create-answers" type="A">
        {question.answers.map(a => {
          return <li className="create-answer"><CreateAnswer 
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

export default CreateQuestion
