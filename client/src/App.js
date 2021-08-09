import React, { Component } from "react";
import WishFrame from "./components/WishFrame";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Switch } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Hero from "./components/Hero"
import SimpleStorageContract from "./contracts/SimpleToken.json";
import PaymentHandlerContract from "./contracts/PaymentHandler.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Switch>
          <Route exact path='/home' component={Hero}/>
          <Route path='/purchase' />               
          <Route path='/about'/> 
        </Switch>
      </div>
    );
  }
}

export default App;
