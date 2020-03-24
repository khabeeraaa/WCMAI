import React,{Fragment , useState, useEffect} from 'react';
import  {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect 
} from "react-router-dom";
import './App.css';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components

import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";

toast.configure();

function App() {

    


    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean =>{
        setIsAuthenticated (boolean);
    };

    async function isAuth(){
      try {

        const response  = await fetch("http://localhost:5000/auth/is-verify",{
          method : "GET",
          headers : {token : localStorage.token}
        });
          const parseRes = await response.json();

          parseRes === true ?  setIsAuthenticated(true): setIsAuthenticated(false);


      } catch (err) {
        console.error(err.message);
        
      }
    }

    useEffect(() => {
      isAuth()
    })


  return (
      <Fragment>
        <Router>
          <div className="container">
            <Switch>
            <Route exact path ="/" render={props => !isAuthenticated ? <Homepage setAuth={setAuth} {...props} /> : <Redirect to="/dashboard" />  } />
        <Route exact path ="/homepage" render={props => !isAuthenticated ? <Homepage {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />  } />
        <Route exact path ="/login" render={props => isAuthenticated ? <login {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />} />
          <Route exact path ="/Dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />} />
            </Switch>
          </div>
        </Router>

      </Fragment>
  );
}

export default App;
