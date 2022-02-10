var myWish = artifacts.require("./MyWish.sol");

const process = require('process');
require('dotenv').config({ path: '/Users/zlederman/Documents/Code/js/truffle-react/.env' })


module.exports = async function(deployer,network,accounts) {
  const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]];
  await deployer.deploy(myWish);
  const stateManager = (deployer.network == "development" ? accounts[0] : process.env.MY_ADDRESS);
};

