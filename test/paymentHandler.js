const paymentHandler = artifacts.require("./PaymentHandler.sol");
const wishToken = artifacts.require("./MyWish.sol");

contract("paymentHandler", accounts => {

    it("should getPrice", async () =>{
      const tokenInstance = await wishToken.deployed()
      const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
      const paymentHandlerInstance = await paymentHandler.deployed();
      const value = await paymentHandlerInstance.getPrice.call();
      assert.equal(value,3000000000000000000,"contract method doesnt work");
    });
    it("should get Token contract address",async() =>{
      const tokenInstance = await wishToken.deployed()
      const ppl = [accounts[0],accounts[1],accounts[2],accounts[3]]
      const paymentHandlerInstance = await paymentHandler.deployed();

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


    // it("should increase balances", async() =>{
    //   const paymentHandlerInstance = await paymentHandler.deployed();
    //   price = 3000000000000000000;
      
    //   const ppl = Array(4);
    //   const balances = Array(4);
    //   const balancesNew = Array(4);
    //   for(let i = 0; i < 4; i++){
    //     ppl[i] = await paymentHandlerInstance.payee.call(i);
    //     balances[i] =  parseInt(await web3.eth.getBalance(ppl[i]));
    //   } 
     
    //   const res = await paymentHandlerInstance.buyToken.sendTransaction({from: accounts[11], gas:3000000, value: 3000000000000000000});
    //   for(let i = 0; i<  4; i++){
    //     balancesNew[i] =  parseInt(await web3.eth.getBalance(ppl[i]));
    //   }
    //   assert.equal(balancesNew[0],balances[0] + (price*0.02),"incorrect amount added Zach");
    //   assert.equal(balancesNew[1],balances[1] + (price*0.02),"incorrect amount added Seb ");
    //   assert.equal(balancesNew[2],balances[2] + (price*0.06),"incorrect amount added Evan");
    //   assert.equal(balancesNew[3],balances[3] + (price*0.9),"incorrect amount added Make A Wish");
    // })

    it("should add user to raffle", async() =>{
      const paymentHandlerInstance = await paymentHandler.deployed();
      const requester = accounts[11];
      const quantity = 1;
      const price = 3000000000000000000;
      await paymentHandlerInstance.enterRaffle.sendTransaction(quantity,{from:requester, gas: 300000, value: price*quantity})
      const num_tickets = await paymentHandlerInstance.getTokensRequested.call(requester);
      assert.equal(num_tickets,quantity,"No tickets were added");

    })
    it("should fail adding to raffle - too many tickets",async () => {
      const paymentHandlerInstance = await paymentHandler.deployed();
      const requester = accounts[5];
      const quantity = 7;
      const price = 3000000000000000000;
      og_balance = parseInt(await web3.eth.getBalance(requester));

      await paymentHandlerInstance.enterRaffle.sendTransaction(quantity,{from:requester, gas: 300000, value: price*quantity})
      const num_tickets = await paymentHandlerInstance.getTokensRequested.call(requester);
      const after_balance = parseInt(await web3.eth.getBalance(requester));
      assert.notEqual(num_tickets,quantity);
      assert.equal(og_balance - 30000,after_balance);

    })
    it("should fail adding to raffle - not enough eth",async () => {
      const paymentHandlerInstance = await paymentHandler.deployed();
      const requester = accounts[5];
      og_balance = parseInt(await web3.eth.getBalance(requester));
      const quantity = 7;
      const price = 3000000000000000000;
      await paymentHandlerInstance.enterRaffle.sendTransaction(quantity,{from:requester, gas: 300000, value: price * (quantity - 1)})
      const num_tickets = await paymentHandlerInstance.getTokensRequested.call(requester);
      const after_balance = parseInt(await web3.eth.getBalance(requester));
      assert.notEqual(num_tickets,quantity);
      assert.equal(og_balance - 30000,after_balance);

    })


  });


    
// it should get price
// it should recieveEther - update balance
// it should sendEther to external addresses
// it should validate tokenParams
// it should invoke tokenContract 
// it should emit purchase completed

//How do I test ownable contracts??