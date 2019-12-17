import React, { Fragment } from "react";
import Quiz from "./Quiz.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

// function replace_url(relative_url) {}

function Index() {
  document.body.style = "height: 100%;";
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
              Quiz Creator
            </div>
          </li>
        </Link>

        <a>
          <li>
            <div style={{ paddingTop: "0.57px" }}>
              <i class="fonta fas fa-file-alt" />
              <br />
              Quiz Viewer
            </div>
          </li>
        </a>
      </ul>
    </Fragment>
  );
}

class QuizMenu extends React.Component {
  getJSONData() {
    let element = document.querySelector(".file");
    let file = element.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      location.pathname = "/quiz/" + btoa(reader.result);
    };
    reader.readAsText(file);
  }

  render() {
    document.body.style = "height: 100%;";
    return (
      <Fragment>
        <header>
          <ul>
            <li>
              <Link to="/">
                <i class="fonta fas fa-arrow-left" /> Back
              </Link>
            </li>
            <li className="key">Quiz Creator</li>
            <li />
          </ul>
        </header>

        <input
          style={{ display: "none" }}
          type="file"
          accept="application/json"
          onChange={this.getJSONData}
          className="file"
        />

        <ul className="btns">
          <Link to="/quiz/ewogICAgInRpdGxlIjogIiIsCiAgICAiYXV0aG9yIjogIiIsCiAgICAicXVlc3Rpb25zIjogWwogICAgICAgIHsKICAgICAgICAgICAgInRpdGxlIjogIiIsCiAgICAgICAgICAgICJhbnN3ZXJzIjogewogICAgICAgICAgICAgICAgIiI6ICIiCiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICBdCn0=">
            <li>
              <div>
                <i class="fonta fas fa-plus" />
                <br />
                New Quiz
              </div>
            </li>
          </Link>
          <a onClick={() => document.querySelector(".file").click()}>
            <li>
              <div style={{ paddingTop: "0.57px" }}>
                <i class="fonta fas fa-file-signature" />
                <br />
                Edit Quiz
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
    <Router>
      <Route exact path="/" component={Index} />
      <Route path="/quiz/:quiz" component={Quiz} />
      <Route path="/quiz-menu" component={QuizMenu} />
    </Router>
  );
}

export default App;
