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

    it("should mint nft",async () =>{
      const paymentHandlerInstance = await paymentHandler.deployed()
      const res = await paymentHandlerInstance.buyToken.sendTransaction({from: accounts[0],gas:3000000, value: 3000000000000000000})

    })

    it("should increase balances", async() =>{
      const paymentHandlerInstance = await paymentHandler.deployed();
      price = 3000000000000000000;
      
      const ppl = Array(4);
      const balances = Array(4);
      const balancesNew = Array(4);
      for(let i = 0; i < 4; i++){
        ppl[i] = await paymentHandlerInstance.payee.call(i);
        balances[i] =  parseInt(await web3.eth.getBalance(ppl[i]));
      } 
     
      const res = await paymentHandlerInstance.buyToken.sendTransaction({from: accounts[4],gas:3000000, value: 3000000000000000000});
      for(let i = 0; i<  4; i++){
        balancesNew[i] =  parseInt(await web3.eth.getBalance(ppl[i]));
      }
      assert.equal(balancesNew[0],balances[0] + (price*0.02),"incorrect amount added Zach");
      assert.equal(balancesNew[1],balances[1] + (price*0.02),"incorrect amount added Seb ");
      assert.equal(balancesNew[2],balances[2] + (price*0.06),"incorrect amount added Evan");
      assert.equal(balancesNew[3],balances[3] + (price*0.9),"incorrect amount added Make A Wish");
    })

    it("should add user to raffle", async() =>{
      
    })
    

  });


    
// it should get price
// it should recieveEther - update balance
// it should sendEther to external addresses
// it should validate tokenParams
// it should invoke tokenContract 
// it should emit purchase completed

//How do I test ownable contracts??