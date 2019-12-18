import React,{Component} from 'react';

class ViewAnswer extends Component {
  render() {
    let answer = this.props.answer
    return (
      <li key={answer.id}>
        <label className="view-answer">
          {answer.title}
          <input 
            type="radio" 
            name={this.props.id} 
            onChange={() => this.props.onChange(this.props.id, answer.id)}
            checked={this.props.checked}
          />
          <span className="radio"></span>
        </label>
      </li>
    )
  }
}

export default ViewAnswer