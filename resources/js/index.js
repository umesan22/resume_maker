import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "~/views/Components/Components.js";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Components} />
      <Router render={() => <p>not found</p>} />
    </Switch>
  </Router>,
  document.getElementById("app")
);
