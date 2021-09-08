var myWish = artifacts.require("./MyWish.sol");
var paymentHandler = artifacts.require("./PaymentHandler");

module.exports = function(deployer,network,accounts) {
  const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
  deployer.deploy(myWish,{from: accounts[4]}).then(()=>{

    deployer.deploy(paymentHandler,myWish.address,ppl);
  })
  
};

