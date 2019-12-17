import React, { Fragment } from 'react';
import Quiz from './Quiz.js'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';

// function replace_url(relative_url) {}

function Index() {
  document.body.style = "height: 100%;"
  return (
    <Fragment>
      <header>
          <ul>
            <li></li>
            <li className="key">Progressive Survey</li>
            <li></li>
          </ul>
        </header>

        <ul className="btns">
          <li><Link to="/quiz-menu"><div><i class="fonta fas fa-file-signature"></i><br />Quiz Creator</div></Link></li>
          <li><Link to="/view-menu"><div style={{paddingTop:'0.57px'}}><i class="fonta fas fa-file-alt"></i><br />Quiz Viewer</div></Link></li>
        </ul>
    </Fragment>
  )
}

function ViewMenu() {
  document.body.style = "height: 100%;"
  return (
    <Fragment>
      <header>
          <ul>
            <li><Link to="/"><i class="fonta fas fa-arrow-left"></i> Back</Link></li>
            <li className="key">Quiz Creator</li>
            <li></li>
          </ul>
        </header>

        <ul class="btns">
          <li style={{width:'100%'}}>
          <Link to="/quiz"><div><i class="fonta fas fa-file-upload"></i><br />Upload Quiz</div></Link></li>
        </ul>
    </Fragment>
  )
}

class QuizMenu extends React.Component {
  getJSONData(element) {
    alert(element)
  }

  render() {
    document.body.style = "height: 100%;"
    return (
      <Fragment>
        <header>
            <ul>
              <li><Link to="/"><i class="fonta fas fa-arrow-left"></i> Back</Link></li>
              <li className="key">Quiz Creator</li>
              <li></li>
            </ul>
          </header>

          <input style={{display:'none'}} type="file" accept="application/json" onChange={this.getJSONData} class='file'/>

          <ul className="btns">
            <Link 
              to="/quiz/ewogICAgInRpdGxlIjogIiIsCiAgICAiYXV0aG9yIjogIiIsCiAgICAicXVlc3Rpb25zIjogWwogICAgICAgIHsKICAgICAgICAgICAgInRpdGxlIjogIiIsCiAgICAgICAgICAgICJhbnN3ZXJzIjogewogICAgICAgICAgICAgICAgIiI6ICIiCiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICBdCn0="
            ><li><div><i class="fonta fas fa-plus"></i><br />New Quiz</div></li></Link>
            <a onClick={() => document.querySelector('.file').click()}><li><div style={{paddingTop:'0.57px'}}>
              <i class="fonta fas fa-file-signature"></i><br />Edit Quiz</div></li></a>
          </ul>
      </Fragment>
    )
  }
}

function App() {
  return (<Router>
    <Route exact path="/" component={Index}/>
    <Route path="/quiz/:quiz" component={Quiz}/>
    <Route path="/quiz-menu" component={QuizMenu}/>
    <Route path="/view-menu" component={ViewMenu}/>
  </Router>)
}

export default App;
