import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from "./contexts/UserProvider";
import Homepage from "./pages/Homepage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Switch>
            <Route path="/" exact component={Homepage}></Route>
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
