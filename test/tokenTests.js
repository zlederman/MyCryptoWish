const myWish = artifacts.require("./MyWish.sol");
const truffleAssert = require('truffle-assertions');


contract("myWish", async (accounts) => {  
   let contractInstance;
   before(async()=>{
      contractInstance = await myWish.deployed();
   })

   it("should get Price",async() => {
     
    const value = await contractInstance.getPrice.call();
    console.log(contractInstance)
    assert.equal(value,31424425476017000,"price not right");
   });

   it("should set URI", async () =>{
       let success = await contractInstance.setBaseURI.sendTransaction("baseURI!",{from: accounts[0],gas:1250000});
      try{
         await contractInstance.setBaseURI.sendTransaction("baseURI!",{from: accounts[1],gas:1250000})
      }
      catch(err){
         assert.include(err.message,'revert AccessControl', "The error message should contain 'revert AccessControl'")
      }

   });
   it("should handle state changes properly", async ()=>{
        let success;
        let contractState = await contractInstance.getContractState.call();
        assert.equal(contractState,0,"Contract not in presale state initially");

        for(let i = 0; i < 5; i++){
         try{
            await contractInstance.setContractState.sendTransaction(contractState - 1,{from: accounts[0],gas:1250000})
         }
         catch(err){
            assert.include(err.message,'value out-of-bounds', "The error message should contain 'value out-of-bounds'")
         }
            try{
               await contractInstance.setContractState.sendTransaction(contractState + 1,{from: accounts[1],gas:1250000})
            }
            catch(err){
               assert.include(err.message,'revert AccessControl', "The error message should contain 'revert AccessControl'")
            }
      
            success = await contractInstance.setContractState.sendTransaction(contractState + 1, {from: accounts[0], gas: 1250000});
            contractState = await contractInstance.getContractState.call();
            assert.equal(success,true,"contract didn't successfully change state");
            assert.equal(contractState,i+1,"not in correct state");
        }

   });

//    it("should whiteListMint", async (contractInstance)=>{

//    })

})
