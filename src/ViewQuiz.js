import React, { Component, Fragment } from 'react';
import ViewQuestion from './ViewQuestion.js';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom'

function Results(props) { //Results component
  return (
    <div style={{display: props.show ? "block":"none"}} className="results">
      <h1 className="results-title">{props.title} Results</h1>
      <p className="results-content">{props.results}</p>
    </div>
  )
}

function ArrayToString(arr) { //Changes Array to String for results component
  let return_string = ""
  arr.forEach(a => {
    if (a === "") return
    return_string += arr[arr.length-1] === a ? a+".":a+". "
  })
  return return_string
}

class ViewQuiz extends Component {
  randomNum(num) {return Math.floor(Math.random()*num) + 1;}
  
  makeState() { //Make state, similar to one in CreateQuiz.js
    document.body.style = "height: auto;"
    const input = JSON.parse(window.atob(this.props.match.params.quiz));

    return {
      title: input.title,
      author: input.author,
      open: false,
      results: "",
      show: false,
      questions: input.questions.map(q => {
        let answers = [];
        for (let title in q.answers) {
          answers.push({
            title: title,
            result: q.answers[title],
            checked: false,
            id: this.randomNum(100000)
          });
        }
        return {
          title: q.title,
          id: this.randomNum(100000),
          answers: answers
        };
      })
    };
  }
  state = this.makeState();
  
  onChange = (qId, id) => { //When someone clicks on the answer
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

  readyCheck = () => { //Checks if one of the answers aren't checked.
    let return_bool
    this.state.questions.forEach((q) => {
      return_bool = q.answers.filter((a) => a.checked).length !== 0
    });
    return return_bool
  }
  
  results = () => { //Outputs the results of the quiz answers
    if(!this.readyCheck()) {
      this.handleOnOpen();
      return;
    }

    let results = ArrayToString(this.state.questions.map((q) => {
      return q.answers.filter((a) => a.checked)[0].result;
    }));
    this.setState({
      results: results,
      show: true
    });
    console.log(results);
  }
  
  handleOnOpen = () => { //Opens error modal
    this.setState({open:true});
  }
  
  handleOnClose = () => { //Closes error modal
    this.setState({open:false});
  }
  
  render() {
    document.title = this.state.title;
    return (
      <Fragment>
        <Popup
        open={this.state.open}
        closeOnDocumentClick
        onClose={this.handleOnClose}
        >
          <span className="error-content">Hey! You need to answer all the options!</span>
          <button className="error-close closebtn" onClick={this.handleOnClose}>Okay</button>
        </Popup>

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
        <div id="view-root" style={{display: !this.state.show ? "block":"none"}}>
          <h1 className="view-title">{this.state.title}</h1><br/>
          <h3 className="view-preauthor">By:</h3><h3 className="view-author">{this.state.author}</h3>
          {this.state.questions.map((q) => {
            return <ViewQuestion 
              key={q.id}
              question={q}
              onChange={this.onChange}
            />
          })}
          <button className="fin btn" onClick={this.results}>Submit</button>
        </div>
        <Results show={this.state.show} results={this.state.results} title={this.state.title}/>
      </Fragment>
      );
    }
}

export default ViewQuiz;
