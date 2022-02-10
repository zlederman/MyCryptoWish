const wishToken = artifacts.require("./MyWish.sol");
const truffleAssert = require('truffle-assertions');


contract("myWish", accounts => {
const contractInstance = await myWish.deployed();
   it("should get Price",async(contractInstance) => {
    const value = await contractInstance.getPrice.call();
    assert.equal(value,3000000000000000000,"price not right");
   });
//    it("should get beneficiary address", async (contractInstance) => {
//     const address = contractInstance.getBeneficiaryAddress.call();
//     assert.notEqual(address,"0","contract address setting doesn't work");
//    })
//    it("should set URI", async (contractInstance) =>{
//        let success = await contractInstance.sendTransaction("baseURI!",{from: accounts[0],gas:125000});
//        truffleAssert.fails(
//          await contractInstance.sendTransaction("baseURI!",{from: accounts[1],gas:125000}),
//        );
//    });
//    it("should handle state changes properly", async (contractInstance)=>{
//         let success;
//         let contractState = await contractInstance.getContractState.call();
//         assert.equal(contractState,0,"Contract not in presale state initially");

//         for(let i = 0; i < 5; i++){
//             truffleAssert.fails(
//                 await contractInstance.setContractState.sendTransaction(contractState-1,{from: accounts[0],gas:125000})
//             )
//             truffleAssert.fails(
//                 await contractInstance.setContractState.sendTransaction(contractState+1,{from: accounts[1],gas:125000})
//             )
//             success = await contractInstance.sendTransaction(contractState + 1, {from: accounts, gas: 125000});
//             contractState = await contractInstance.getContractState.call();
//             assert.equal(success,true,"contract didn't successfully change state");
//             assert.equal(contractState,i+1,"not in correct state");
//         }

//    });

//    it("should whiteListMint", async (contractInstance)=>{

//    })

})
