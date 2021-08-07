pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleToken.sol";

contract TestSimpleStorage {

  function testItStoresAValue() public {
    address WALLET = 0xdBbBee9db5B782F95eD38039aFE488ee086D9cD7;
    SimpleToken simpleToken = SimpleToken(DeployedAddresses.SimpleToken());

    simpleToken.safeMint(WALLET,69);

    uint expected = 69;

    Assert.equal(simpleToken.get_token(WALLET), expected, "fuck u");
  }

}
