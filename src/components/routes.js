import { Router, Route } from "react-router";
import App from "./App";
import About from "./App/about";
import AddCards from "./AddCards";
import ReturnPlayer from "./ReturnPlayer";
import React from "react";

export default props => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/add-cards" component={AddCards} />
    <Route path="/return-player" component={ReturnPlayer} />
  </Router>
);
