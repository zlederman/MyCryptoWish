var myWish = artifacts.require("./MyWish.sol");

const process = require('process');


module.exports = async function(deployer,network,accounts) {
  const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]];
  await deployer.deploy(myWish);
  
};

