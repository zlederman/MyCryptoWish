const paymentHandler = artifacts.require("./PaymentHandler.sol");
const wishToken = artifacts.require("./MyWish.sol");
const truffleAssert = require('truffle-assertions');
require('dotenv').config({ path: '/Users/zlederman/Documents/Code/js/truffle-react/.env' })

contract("paymentHandler", accounts => {

    it("should getPrice", async () =>{
      const tokenInstance = await wishToken.deployed()
      const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
      const paymentHandlerInstance = await paymentHandler.deployed();
      const value = await paymentHandlerInstance.getPrice.call();
      assert.equal(value,30000000000000000,"contract method doesnt work");
    });
    it("should get Token contract address",async() =>{
      const tokenInstance = await wishToken.deployed()
      const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
      const paymentHandlerInstance = await paymentHandler.deployed();

      const address = await paymentHandlerInstance.getTokenAddress.call();
      assert.equal(address,tokenInstance.address,"address of token contract is wrong")
    })
    it("should only allow minter role ",async() =>{
      const tokenInstance = await wishToken.deployed()
      const paymentHandlerInstance = await paymentHandler.deployed()
      const success = await tokenInstance.getRole.call({from:paymentHandlerInstance.address})
      assert.equal(true,success,"Name error")
      await truffleAssert.reverts(tokenInstance.getRole.call({from:accounts[3]}))
    })

    it("should be able to mutate paymentHandler state to Raffle", async () => {
      const paymentHandlerInstance = await paymentHandler.deployed();
      let contractStateInit = await paymentHandlerInstance.getContractState.call();
      assert.equal(contractStateInit.words[0],0,"Wrong State");
      let success = await paymentHandlerInstance.setContractState.sendTransaction(contractStateInit + 1,{from: accounts[0], gas:125000});
      let contractStateNext = await paymentHandlerInstance.getContractState.call();
    
      assert.equal(contractStateNext.words[0],contractStateInit.words[0]+1,"state not set properly");
    });

    it("should test enterRaffle", async() =>{
      const paymentHandlerInstance = await paymentHandler.deployed();
      const requester = accounts[5];
      let currentTix = 0
      quantity = 1

      await paymentHandlerInstance.enterRaffle.sendTransaction(quantity,{from:requester, gas: 1250000})
      let num_tickets = await paymentHandlerInstance.getTokensRequested.call(requester);
      assert.equal(num_tickets,++currentTix,"No tickets were added");

      await paymentHandlerInstance.enterRaffle.sendTransaction(quantity,{from:requester, gas: 1250000})
      num_tickets = await paymentHandlerInstance.getTokensRequested.call(requester);
      assert.equal(num_tickets,++currentTix,"No tickets were added");

      await paymentHandlerInstance.enterRaffle.sendTransaction(quantity,{from:requester, gas: 1250000})
      num_tickets = await paymentHandlerInstance.getTokensRequested.call(requester);
      assert.equal(num_tickets,++currentTix,"No tickets were added");

      await truffleAssert.reverts(
        paymentHandlerInstance.enterRaffle(quantity,{from:requester,gas:1250000}),
        "Returned error: VM Exception while processing transaction: revert Please request fewer tokens -- Reason given: Please request fewer tokens.")
    })

    

  });


    
// it should get price
// it should recieveEther - update balance
// it should sendEther to external addresses
// it should validate tokenParams
// it should invoke tokenContract 
// it should emit purchase completed

//How do I test ownable contracts??