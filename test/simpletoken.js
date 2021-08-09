const SimpleToken = artifacts.require("./PaymentHandler.sol");
const WALLET = "0xdBbBee9db5B782F95eD38039aFE488ee086D9cD7"
contract("PaymentHandler", accounts => {
  it("...should emit the wallet", async () => {
    const TokenInstance = await SimpleToken.deployed();
    // Set value of 89
    await TokenInstance.sendEther().send({from: accounts[0], gas: 3000000, value: price});
    // Get stored value
   
  });
});