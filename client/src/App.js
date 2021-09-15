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


class App extends Component {
  state = { storageValue: [], web3: null, accounts: null, contract: null };
  componentDidMount = async () => {
      // try {
      
      
      // // Get network provider and web3 instance.
      // // const web3 = await getWeb3();

      // // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts();

      // // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = SimpleTokenContract.networks[networkId];
      // // const deployedNetworkPayment = PaymentHandlerContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //     SimpleTokenContract.abi,
      //     deployedNetwork && deployedNetwork.address,
      // );
      // this.state.contract = instance
      // this.state.accounts = accounts;

      // // Set web3, accounts, and contract to the state, and then proceed with an
      // // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance });
      // } catch (error) {
      // // Catch any errors for any of the above operations.
      // alert(
      //     `Failed to load web3, accounts, or contract. Check console for details.`,
      // );
      // console.error(error);
      // }
      console.log("yo")
  };

  getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
  };
  runExampleNFT = async () => {
      console.log(this.state)
      const { accounts, contract } = this.state;
      // mints a token
      await contract.methods.safeMint(accounts[0],this.getRandomInt(78)).send({ from: accounts[0] });
      // gets the token id
      const response = await contract.methods.get_token(accounts[0]).call();
      console.log(response)
      // updates state array
      this.setState({ storageValue: [...this.state.storageValue,response]});
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
  onClickEventNFT = ()=>{
      this.runExampleNFT();
  };
  onClickEventPayment = () =>{
      this.execPayment();
  };

  render() {
    return (
      <div className="App">
        {/* <div>
        <NightSky></NightSky>
        <CardFooter></CardFooter>
        </div> */}
        <AboutPage></AboutPage>

        {/* <Navigation/> */}
        {/* Navbar for site */}
        {/* <Switch>
          <Route exact path='/home' component={Hero}/>
          <Route path='/purchase' />               
          <Route path='/about'/> 
        </Switch> */}
        {/* routes for each button on the navbar */}
        {/* <div>
        <Button onClick={this.onClickEventNFT}>Mint NFT</Button>
        {this.state.storageValue.toString()}
        </div> */}

      </div>
    );
  }
}

export default App;
