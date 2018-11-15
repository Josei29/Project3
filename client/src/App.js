import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTabs/NavTabs.js";
import Home from "./components/Home/Home.js";
import Budget from "./components/Budget/Budget.js";
import Special from "./components/Special/Special.js";
import Send from "./components/Send/Send.js";

class App extends Component {

  state = {
    username: ""
  }

  render() {
    return (
      <Router>
        <div>
          <NavTabs user={this.state.username}/>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/budget/:name" component={Budget} />
          <Route path="/user/special/:name" component={Special} />
          <Route path="/user/send/:name" component={Send} />
        </div>
      </Router>
    );
  }
}

export default App;
