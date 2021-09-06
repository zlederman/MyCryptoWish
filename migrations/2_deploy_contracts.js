var myWish = artifacts.require("./MyWish.sol");
var paymentHandler = artifacts.require("./PaymentHandler");

module.exports = function(deployer) {
  deployer.deploy(myWish);
  deployer.deploy(paymentHandler);
};

