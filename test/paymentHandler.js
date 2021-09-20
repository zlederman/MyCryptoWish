const paymentHandler = artifacts.require("./PaymentHandler.sol");
const wishToken = artifacts.require("./MyWish.sol");

contract("paymentHandler", accounts => {
    it("should getPrice", async () =>{
      const tokenInstance = await wishToken.deployed()
      const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
      const paymentHandlerInstance = await paymentHandler.new(tokenInstance.address,ppl)
      
      const value = await paymentHandlerInstance.getPrice.call();
      assert.equal(value,3000000000000000000,"contract method doesnt work");
    });
    it("should get Token contract address",async() =>{
      const tokenInstance = await wishToken.deployed()
      const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
      const paymentHandlerInstance = await paymentHandler.new(tokenInstance.address,ppl)

      const address = await paymentHandlerInstance.getTokenAddress.call();
      assert.equal(address,tokenInstance.address,"is wrong")
    })
    it("should only allow minter role ",async() =>{
      const tokenInstance = await wishToken.deployed()
      const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
      
      const paymentHandlerInstance = await paymentHandler.deployed()
      console.log(paymentHandlerInstance.address)
      await tokenInstance.setMinterRole(paymentHandlerInstance.address,{from:accounts[4]});
      const success = await tokenInstance.getRole.call({from:paymentHandlerInstance.address})

      assert.equal(true,success,"Name error")
    })


  

  });


    
// it should get price
// it should recieveEther - update balance
// it should sendEther to external addresses
// it should validate tokenParams
// it should invoke tokenContract 
// it should emit purchase completed

//How do I test ownable contracts??