import React, { Component, Fragment } from 'react';
import ViewQuestion from './ViewQuestion.js';
import {Link} from 'react-router-dom'

class ViewQuiz extends Component {
  randomNum(num) {return Math.floor(Math.random()*num) + 1;}
  makeState() {
    document.body.style = "height: auto;"
    const input = JSON.parse(window.atob(this.props.match.params.quiz));

    return {
      title: input.title,
      author: input.author,
      questions: input.questions.map(q => {
        let answers = [];
        for (let title in q.answers) {
          answers.push({
            title: title,
            result: q.answers[title],
            checked: false,
            id: this.randomNum(100000)
          })
        }
        return {
          title: q.title,
          id: this.randomNum(100000),
          answers: answers
        }
      })
    };
  }
  state = this.makeState();
  onChange = (qId, id) => {
    this.setState({questions: this.state.questions.map((q) => {
      if(qId === q.id) {
        q.answers = q.answers.map((a) => {
          return {
            title: a.title,
            result: a.result,
            checked: a.id === id,
            id: a.id
          }
        })
      }
      return q
    })})
  }
  readyCheck = () => {
    let return_bool
    let results = this.state.questions.forEach((q) => {
      return_bool = q.answers.filter((a) => a.checked).length !== 0
    });
    return return_bool
  }
  results = () => {
    if(!this.readyCheck()) return

    let results = this.state.questions.map((q) => {
      return q.answers.filter((a) => a.checked)[0].result
    });
    console.log(results)
  }
  render() {
    return (
      <Fragment>
        <header>
          <ul>
            <li>
              <Link to="/">
                <i class="fonta fas fa-arrow-left" /> Back
              </Link>
            </li>
            <li className="key">{this.state.title}</li>
            <li />
          </ul>
        </header>
        <div id="view-root">
          <h1 className="view-title">{this.state.title}</h1><br/>
          <h3 className="view-preauthor">By:</h3><h3 className="view-author">{this.state.author}</h3>
          {this.state.questions.map((q) => {
            return <ViewQuestion 
              key={q.id}
              question={q}
              onChange={this.onChange}
            />
          })}
          <button className="submit btn" onClick={this.results}>Submit</button>
        </div>
      </Fragment>
      )
    }
}

export default ViewQuiz
