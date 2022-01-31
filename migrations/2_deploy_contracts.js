var myWish = artifacts.require("./MyWish.sol");
var paymentHandler = artifacts.require("./PaymentHandler");
const process = require('process');
require('dotenv').config({ path: '/Users/zlederman/Documents/Code/js/truffle-react/.env' })


module.exports = async function(deployer,network,accounts) {
  const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]];
  await deployer.deploy(myWish);
  await deployer.deploy(
    myWish,
    ppl
  );
  const stateManager = (deployer.network == "development" ? accounts[0] : process.env.MY_ADDRESS);
  await paymentHandlerInstance.setStateManagerRole(stateManager);
  await paymentHandlerInstance.setURIManagerRole(stateManager);
  await paymentHandlerInstance.setWhiteListManagerRole(stateManager);
  await myWishInstance.setMinterRole(paymentHandlerInstance.address);
};

