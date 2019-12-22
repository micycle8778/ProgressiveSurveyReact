import React from 'react';
import CreateQuestion from './CreateQuestion.js';
import { Link } from 'react-router-dom';
import './App.css'

function saveAs(uri, filename) { //Downloads survey for user
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

class CreateQuiz extends React.Component { //Main quiz
  randomNum(num) {return Math.floor(Math.random()*num) + 1;} //Random number
  makeState = () => { //Make state from URL
    document.body.style = "height: auto;"
    const input = JSON.parse(window.atob(this.props.match.params.quiz)); //Turn the URL to JSON

    return { //Turn ProgressiveSurvey output into state
      title: input.title,
      author: input.author,
      questions: input.questions.map(q => {
        let answers = [];
        for (let title in q.answers) {
          answers.push({
            title: title,
            result: q.answers[title],
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
	state = this.makeState(); //This quiz's state is now the output of makeState()

  genAnswer = () => { //Generate answer to append to state
    return  {
      title: '', 
      result: '', 
      id: this.randomNum(100000)
    }
  }
  
  addQ = () => { //Add question to state
    this.setState(
      {questions: [
        ...this.state.questions,
        {
          title: '',
          answers: [this.genAnswer()],
          id: this.randomNum(100000)
        }
      ]}
    );
  }

  delQ = (qId) => { //Take question out of state
    this.setState(
      {questions: this.state.questions.filter(q => {return q.id !== qId})}
    );
  }

  
  onChange = (e) => { // Update the title and author
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  
  addA = (id) => { //Add Answer option to state
    this.setState({questions: this.state.questions.map(q => {
      if(q.id === id) {
        console.log(id);
        return {
          title: q.title,
          id: q.id,
          answers: [
            ...q.answers, 
            {
              title: '', 
              result: '', 
              id: this.randomNum(100000)
            }
          ]
        }
      } else {
        return q
      }
    })});
  }

  
  delA = (qId, aId) => { //Remove Answer option from state
    this.setState({questions: this.state.questions.map(q => {
      if(q.id === qId) {
        return {
          title: q.title,
          id: q.id,
          answers: q.answers.filter(a => {return a.id !== aId})
        }
      } else {
        return q
      }
    })});
  }

  changeQuestionTitle = (title, id) => { //Change question state
    this.setState({questions: this.state.questions.map(q => {
      if(q.id === id) {
        return {
          title: title,
          id: q.id,
          answers: q.answers
        }
      } else {
        return q
      }
    })});
  }

  changeAnswerData = (qId, aId, type, data) => { //Change answer state
    this.setState({questions: this.state.questions.map(q => {
      if (q.id === qId) {
        return {
          title: q.title,
          id: qId,
          answers: q.answers.map(a => {
            if (a.id === aId) {
              return {
                title: type === "title" ? data : a.title,
                result: type === "result" ? data : a.result,
                id: aId
              }
            } else {
              return a
            }
          })
        }
      } else {
        return q
      }
    })});
  }

  compile = () => { //Output quiz data
    let quiz = this.state
    quiz.questions = quiz.questions.map(q => {
      let answers = {}
      q.answers.forEach(a => {
        answers[a.title] = a.result
      })
      return {
        title: q.title,
        answers: answers
      }
    });
    saveAs("data:application/json;charset=utf-8;base64,"+window.btoa(unescape(encodeURIComponent(JSON.stringify(quiz,"")))), quiz.title+".json");
  }

  render() {
    return (
      <React.Fragment>
        <header className="quiz-header">
          <ul>
            <li><Link to="/quiz-menu"><i class="fas fa-arrow-left"></i> Back</Link></li>
            <li className="key">Survey Creator</li>
            <li></li>
          </ul>
        </header>


        <input type="text" name="title" placeholder="Survey Title" value={this.state.title} onChange={this.onChange} className="create-title"/> {' '}
        <input type="text" name="author" placeholder="Survey Author" value={this.state.author} onChange={this.onChange} className="create-author"/> <br /><br />
        
        {this.state.questions.map(q => {
          return <CreateQuestion 
            key={q.id} 
            question={q} 
            delQ={this.delQ}
            addA={this.addA} 
            delA={this.delA} 
            onChange={this.changeQuestionTitle}
            onAnswerChange={this.changeAnswerData}
          />
        })}

        <button onClick={this.addQ }  className="adda addbtn btn">Add Question</button><br />
        {/* <button onClick={this.delQ}>Remove Question</button> <br /><br /> */}
        <button onClick={this.compile} className="fin btn">Finish</button>
      </React.Fragment>
    )
  }
}

export default CreateQuiz;

