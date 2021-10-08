import React, { Component } from "react";
import CardFooter from "./components/CardFooter"
import NightSky from "./components/NightSky"
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleTokenContract from "./contracts/SimpleToken.json";
import PaymentHandlerContract from "./contracts/PaymentHandler.json";
import getWeb3 from "./getWeb3";
import AboutPage from "./components/about";
import {Button} from "react-bootstrap"
import "./App.css";
import WishView from "./components/WishFrame";


class App extends Component {
  state = {  web3: null, accounts: null, contract: null, hidden: false };
  componentDidMount = async () => {
      try {
      
      
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleTokenContract.networks[networkId];
      // const deployedNetworkPayment = PaymentHandlerContract.networks[networkId];
      const instance = new web3.eth.Contract(
          SimpleTokenContract.abi,
          deployedNetwork && deployedNetwork.address,
      );
      this.state.contract = instance
      this.state.accounts = accounts;

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
      }
      console.log("yo")
  };

  getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
  };
  execPayment = async () => {
      const {accounts, contract } = this.state;
      var price = await contract.methods.getPrice().call();
      
      contract.methods.sendEther().send({},{from: accounts[0], gas: 3000000, value: price})
      .then((err,receipt) =>{
      // this.runExampleNFT()
      });

      const response = await contract.methods.getBalanceOfPaymentHandler().call();
      // this.setState({storageValue : [...this.state.storageValue, response]})
  };

  onClickHide = () => {
    this.setState({hidden:true})
  }
  render() {
    return (
      <div className="App">
        <div>
        <NightSky></NightSky>
        {this.state.hidden ? <WishView handleClick= {this.execPayment.bind(this)}/> : <AboutPage/>}
        <CardFooter handleClick={this.onClickHide.bind(this)}></CardFooter>  
        </div>
      </div>
    );
  }
}

export default App;
