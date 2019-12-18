import React from 'react'


function Answer(props) {
  let {answer} = props
  return (
    <React.Fragment>
      <input 
        type="text" 
        value={answer.title}
        name="title"
        placeholder="Answer Title"
        onChange={props.onChange}
      /> 
      {' '} <input 
        type="text" 
        value={answer.result}
        name="result"
        placeholder="Answer Result"
        onChange={props.onChange}
      /> {' '}
      <button className="delbtn button btn" onClick={props.delA}>X</button>
    </React.Fragment>
  )
}


export default Answer
