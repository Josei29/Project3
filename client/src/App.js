import React, { Component } from "react";
// Importing react-router-dom to help us with the navigation between pages
import { BrowserRouter as Router, Route } from "react-router-dom";
// Importing our Components
import NavTabs from "./components/NavTabs/NavTabs.js";
import Home from "./components/Home/Home.js";
import Budget from "./components/Budget/Budget.js";
import Special from "./components/Special/Special.js";
import Send from "./components/Send/Send.js";

// Our main Component, will render the NavBar and also we're creating all the routes
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavTabs />
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
