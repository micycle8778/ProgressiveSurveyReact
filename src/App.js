import React, { Fragment, Component } from "react";
import CreateQuiz from "./CreateQuiz.js";
import ViewQuiz from "./ViewQuiz.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

let dest;

let requestFile = () => {document.querySelector(".file").click()}

function Index() {
  document.body.style = "height: 100%;";
  dest = '/view/'
  return (
    <Fragment>
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

        <a onClick={requestFile}>
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

class QuizMenu extends Component {
  render() {
    document.body.style = "height: 100%;";
    dest = "/quiz/";
    return (
      <Fragment>
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
          <a onClick={requestFile}>
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
  getJSONData() {
    let element = document.querySelector(".file");
    let file = element.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      window.location.pathname = dest + btoa(reader.result);
    };
    reader.readAsText(file);
  }
  render() {
    document.title = 'Progressive Survey'
    return (
      <Fragment>
        <Router>
          <Route
            path="/"
            render={() => (
              <input
                type="file"
                style={{ display: "none" }}
                className="file"
                onChange={this.getJSONData}
                accept="application/json"
              />
            )}
          />
          <Route exact path="/" component={Index} />
          <Route path="/quiz/:quiz" component={CreateQuiz} />
          <Route path="/view/:quiz" component={ViewQuiz} />
          <Route path="/quiz-menu" component={QuizMenu} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
