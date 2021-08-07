const SimpleToken = artifacts.require("./SimpleToken.sol");
const WALLET = "0xdBbBee9db5B782F95eD38039aFE488ee086D9cD7"
contract("SimpleToken", accounts => {
  it("...should emit the wallet", async () => {
    const TokenInstance = await SimpleToken.deployed();
    // Set value of 89
    await TokenInstance.safeMint(WALLET,69);
    // Get stored value
    const tokenId = await TokenInstance.get_token(WALLET);

    assert.equal(tokenId ,69, "The token was not minted");
  });
});
