import React,{Fragment , useState, useEffect} from 'react';
import  {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect 
} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components

import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import Homepage from "./components/Homepage";
import AdminLayout from "./views/Admin";

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
            <Switch>
              <Route exact path ="/" render={props => <Homepage setAuth={setAuth} isAuthenticated={isAuthenticated} {...props} />} />
              {/* <Route exact path ="/homepage" render={props => !isAuthenticated ? <Homepage {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />  } /> */}
              {/* <Route exact path ="/admin" render={props => !isAuthenticated ? <AdminLayout {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />  } />
              <Route exact path ="/login" render={props => isAuthenticated ? <login {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />} />
              <Route exact path ="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />} /> */}
              {/* <Route exact path ="/settings" render={props => isAuthenticated ? <Settings {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />} /> */}
            </Switch>
        </Router>

      </Fragment>
  );
}

export default App;
