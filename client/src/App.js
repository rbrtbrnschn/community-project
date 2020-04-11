import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Homepage from "./components/Homepage";
import CreateAccountPage from "./components/CreateAccount"
import LoginPage from "./components/LoginAccount"
import TestPage from "./components/Test";
import TasksPage from "./components/Tasks";
import ProfilePage from "./components/Profile";
import FriendsPage from "./components/Friends";
import Navbar from "./components/navbar";
import "./App.css";

//! Bulma.io
import "bulma/css/bulma.min.css";

//! Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee,fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(faCheckSquare,faCoffee,fas,fab);

function App() {
  return (
    <div className="App">
	  <Navbar />
      <Router>
        <UserProvider>	
          <Switch>
            <Route path="/" exact render={props => <Homepage {...props}/>}></Route>
	    	<Route path="/createAccount" exact render={props => <CreateAccountPage {...props} />}></Route>
            <Route path="/login" exact render={props => <LoginPage {...props} />}></Route>
	  <Route path="/test" exact render={props => <TestPage {...props} />}></Route>
	<Route path="/tasks" exact render={props => <TasksPage {...props} />}></Route>
	<Route path="/profile" render={props => <ProfilePage {...props} />}></Route>
	<Route path="/friends" render={props => <FriendsPage {...props} />}></Route>
	  </Switch>
	</UserProvider>
      </Router>
    </div>
  );
}

export default App;
