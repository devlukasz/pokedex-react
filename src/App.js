import React, { Component } from "react";
import Dashboard from "./Components/Layout/Dashboard";
import PokemonDetailContainer from "./Components/PokemonDetails/PokemonDetailContainer";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./Components/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route
              exact
              path="/pokemon/:pokemon/"
              component={PokemonDetailContainer}
            />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
