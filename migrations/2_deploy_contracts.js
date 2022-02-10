var myWish = artifacts.require("./MyWish.sol");

const process = require('process');
require('dotenv').config({ path: '/Users/zlederman/Documents/Code/js/truffle-react/.env' })


module.exports = async function(deployer,network,accounts) {
  const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]];
  await deployer.deploy(myWish);
<<<<<<< Updated upstream
  const myWishInstance = await myWish.deployed();
  const _LINK_ADDRESS  = '0xa36085F69e2889c224210F603D836748e7dC0088';
  const VRFCOORDINATOR = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9';
  const KEYHASH = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4';
  await deployer.deploy(
    paymentHandler,
    myWishInstance.address,
    ppl,
    KEYHASH,
    _LINK_ADDRESS,
    VRFCOORDINATOR
  );
  const paymentHandlerInstance = await paymentHandler.deployed();
  const stateManager = (deployer.network == "development" ? accounts[0] : process.env.MY_ADDRESS);
  await paymentHandlerInstance.setStateManagerRole(stateManager);

  await myWishInstance.setMinterRole(paymentHandlerInstance.address);
=======
  const stateManager = (deployer.network == "development" ? accounts[0] : process.env.MY_ADDRESS);
>>>>>>> Stashed changes
};

