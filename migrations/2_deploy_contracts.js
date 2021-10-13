var myWish = artifacts.require("./MyWish.sol");
var paymentHandler = artifacts.require("./PaymentHandler");

module.exports = async function(deployer,network,accounts) {
  const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]];
  await deployer.deploy(myWish,{from: accounts[4]});
  const myWishInstance = await myWish.deployed();
  await deployer.deploy(paymentHandler,myWishInstance.address,ppl);
  const paymentHandlerInstance = await paymentHandler.deployed()
  await myWishInstance.setMinterRole(paymentHandlerInstance.address,{from:accounts[4]});
};

