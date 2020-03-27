import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Homepage from "./components/Homepage";
import CreateAccountPage from "./components/CreateAccount"
import LoginPage from "./components/LoginAccount"
import TestPage from "./components/Test"
import TasksPage from "./components/Tasks";
import "./App.css";
import "bulma/css/bulma.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>	
          <Switch>
            <Route path="/" exact render={props => <Homepage {...props}/>}></Route>
	    	<Route path="/createAccount" exact render={props => <CreateAccountPage {...props} />}></Route>
            <Route path="/login" exact render={props => <LoginPage {...props} />}></Route>
	  <Route path="/test" exact render={props => <TestPage {...props} />}></Route>
	<Route path="/tasks" exact render={props => <TasksPage {...props} />}></Route>
	  </Switch>
	</UserProvider>
      </Router>
    </div>
  );
}

export default App;
