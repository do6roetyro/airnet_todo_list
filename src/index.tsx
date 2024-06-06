import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import "./assets/styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
