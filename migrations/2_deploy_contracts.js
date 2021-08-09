var PaymentHandler = artifacts.require("./PaymentHandler.sol");

module.exports = function(deployer) {
  deployer.deploy(PaymentHandler);
};

