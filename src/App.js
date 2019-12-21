import React, { Fragment, Component, createElement } from "react";
import CreateQuiz from "./CreateQuiz.js";
import ViewQuiz from "./ViewQuiz.js";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "./App.css";

//Ignore me!

function handleOnFile()  {
  let file = document.querySelector('#file').files[0];
  let reader = new FileReader()
  reader.onload = () => this.props.history.push(this.dest+window.btoa(reader.result)); 
  reader.readAsText(file)
}
function requestFile() { document.querySelector("#file").click(); }

class Index extends Component {
  dest = '/view/'
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

class App extends React.Component {
  render() {
    document.title = "Progressive Survey"
    return (
      <Fragment>
        <Router>
          <Route exact path="/" component={Index }/>
          <Route path="/quiz/:quiz" component={CreateQuiz} />
          <Route path="/view/:quiz" component={ViewQuiz} />
          <Route path="/quiz-menu" component={QuizMenu} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
