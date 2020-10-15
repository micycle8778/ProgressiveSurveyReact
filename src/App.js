import React, { Fragment, Component } from "react";
import CreateQuiz from "./CreateQuiz.js";
import ViewQuiz from "./ViewQuiz.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

function handleOnFile()  { //input[type=file] onChange
  let file = document.querySelector('#file').files[0]; //grab file
  let reader = new FileReader()
  //when file read, redirect
  reader.onload = () => this.props.history.push(this.dest+window.btoa(reader.result));
  reader.readAsText(file) //read file
}
function requestFile() { document.querySelector("#file").click(); } //when called, click on file input

class Index extends Component { //First thing user sees
  dest = '/view/' //Prefix of redirection
  handleOnFile = handleOnFile.bind(this)
  requestFile = requestFile.bind(this)
  render() {
    document.title = 'Progressive Survey'
    document.body.style = "height: 100%;";
    return (
      <Fragment>
        <input type="file" id="file" style={{display: "none"}} onChange={this.handleOnFile}/>
        <header>
          <ul>
            <li />
            <li className="key">Progressive Survey</li>
            <li />
          </ul>
        </header>

        <ul className="btns">
          <Link to="/quiz-menu">
            <li>
              <div>
                <i class="fonta fas fa-file-signature" />
                <br />
                Survey Creator
              </div>
            </li>
          </Link>

          <a onClick={this.requestFile}>
            <li>
              <div style={{ paddingTop: "0.57px" }}>
                <i class="fonta fas fa-file-alt" />
                <br />
                Survey Viewer
              </div>
            </li>
          </a>
        </ul>
      </Fragment>
    );
  }
}

class QuizMenu extends Component {
  dest = '/quiz/'
  handleOnFile = handleOnFile.bind(this)
  requestFile = requestFile.bind(this)
  render() {
    document.body.style = "height: 100%;";
    return (
      <Fragment>
        <input type="file" id="file" style={{display: "none"}} onChange={this.handleOnFile}/>
        <header>
          <ul>
            <li>
              <Link to="/">
                <i class="fonta fas fa-arrow-left" /> Back
              </Link>
            </li>
            <li className="key">Survey Creator</li>
            <li />
          </ul>
        </header>

        <ul className="btns">
          <Link to="/quiz/ewogICAgInRpdGxlIjogIiIsCiAgICAiYXV0aG9yIjogIiIsCiAgICAicXVlc3Rpb25zIjogWwogICAgICAgIHsKICAgICAgICAgICAgInRpdGxlIjogIiIsCiAgICAgICAgICAgICJhbnN3ZXJzIjogewogICAgICAgICAgICAgICAgIiI6ICIiCiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICBdCn0=">
            <li>
              <div>
                <i class="fonta fas fa-plus" />
                <br />
                New Survey
              </div>
            </li>
          </Link>
          <a onClick={this.requestFile}>
            <li>
              <div style={{ paddingTop: "0.57px" }}>
                <i class="fonta fas fa-file-signature" />
                <br />
                Edit Survey
              </div>
            </li>
          </a>
        </ul>
      </Fragment>
    );
  }
}

function App() {
  return (
    <Fragment>
      <Router basename="/ProgressiveSurveyReact"> {/* basename prop for GH-Pages only; remove/change if building elsewhere */}
        <Route exact path="/" component={Index }/>
        <Route path="/quiz/:quiz" component={CreateQuiz} />
        <Route path="/view/:quiz" component={ViewQuiz} />
        <Route path="/quiz-menu" component={QuizMenu} />
      </Router>
    </Fragment>
  );
}


export default App;
