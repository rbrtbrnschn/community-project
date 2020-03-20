import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from "./contexts/UserProvider";
import Homepage from "./pages/Homepage";
import CreateAccountPage from "./pages/CreateAccountPage"
import LoginPage from "./pages/LoginPage"
import TestPage from "./pages/TestPage"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Switch>
            <Route path="/" exact component={Homepage}></Route>
	    <Route path="/createAccount" exact component={CreateAccountPage}></Route>
            <Route path="/login" exact component={LoginPage}></Route>
	    <Route path="/test" exact component={TestPage}></Route>  
	</Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
