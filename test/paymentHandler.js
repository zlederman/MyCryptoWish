const paymentHandler = artifacts.requre("./PaymentHandler");
const wishToken = artifacts.require("./Wish.sol");

contract("paymentHandler", accounts => {
    it("should getPrice", async () =>{
      const paymentHandlerInstance = await paymentHandler.deployed();
      const value = await paymentHandlerInstance.getPrice.call();
      assert.equal(value,3,"contract method works");
    });
    it("should set and get payees", async (accounts) =>{
      const paymentHandlerInstance = await paymentHandler.deployed();
      paymentHandlerInstance.setPayees(0,accounts[1],{from:accounts[1]});
      paymentHandlerInstance.setPayees(1,accounts[2],{from:accounts[2]});
      paymentHandlerInstance.setPayees(2,accounts[3],{from:accounts[3]});
      paymentHandlerInstance.setPayees(3,accounts[4],{from:accounts[4]});

      for(let i = 1; i < 5; i++){
        let address = paymentHandlerInstance.getPayees.call(i);
        assert.equal(address,accounts[i],"you can set and get payees"); 
      }      
    });

    it("")

  });


    
// it should get price
// it should recieveEther - update balance
// it should sendEther to external addresses
// it should validate tokenParams
// it should invoke tokenContract 
// it should emit purchase completed

//How do I test ownable contracts??