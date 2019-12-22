import React, {Component} from 'react';
import ViewAnswer from './ViewAnswer.js';

class ViewQuestion extends Component {
  render() {
    let question = this.props.question
    let {answers} = question
    return (
      <div className="view-question">
        <h2>{question.title}</h2>
        <ul class="view-answers">
          {answers.map((a) => {
            return <ViewAnswer
              answer={a}
              id={question.id}
              onChange={this.props.onChange}
              checked={a.checked}
            />
          })}
        </ul>
      </div>
    )
  }
}

export default ViewQuestion