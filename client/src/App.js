import React, { Component } from "react";
import NightSky from "./components/NightSky"
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentHandlerContract from "./contracts/PaymentHandler.json";
import getWeb3 from "./getWeb3";
import AboutPage from "./components/about";
import {Button} from "react-bootstrap"
import "./App.css";
import RafflePage from "./components/rafflepage/rafflepage"


class App extends Component {
  state = {  web3: null, accounts: null, contract: null, contractState: null};
  componentDidMount = async () => {

      try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0])
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = PaymentHandlerContract.networks[networkId];
      const instance = new web3.eth.Contract(
          PaymentHandlerContract.abi,
          deployedNetwork && deployedNetwork.address
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
      this.getContractState();
  };

  getContractState = async () => {
    const {contract} = this.state;
    const state = await contract.methods.getContractState().call();
    this.setState({contractState: state})
  }

  addToRaffle = async(num) => {
    const {web3, accounts,contract} = this.state;
    const price = await contract.methods.getPrice().call()  * num;
    const balance = await web3.eth.getBalance(accounts[0]);
    if(balance < price/1e3){
      alert("Not Enough Eth To Be Verified ")
      return
    }

    const res = await contract.methods.enterRaffle(num).send({from:accounts[0],gas:3000000})
  }
  
  execPayment = async () => {
      const {accounts, contract } = this.state;
      const res = await contract.methods.buyToken().send({from: accounts[0],gas:300000, value: 3000000000000000000})

  };

  render() {
    return (
      <div className="App">
        <div>
          <NightSky></NightSky>
        </div>
        <div>
          {this.state.contractState == 2 ? <RafflePage addToRaffle={this.addToRaffle.bind(this)} /> : <div/>}
          {/* <RafflePage/> */}
          <AboutPage/>
           {/* <CardFooter handleClick={this.onClickHide.bind(this)}></CardFooter>   */}
        </div> 
      </div>
    );
  }
}

  export default App;
