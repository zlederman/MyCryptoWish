const web3 = require('web3');

class ContractAPI {

    constructor(abi,address) {
        this.address = address
        this.abi = abi
        this.web3 = new web3.providers.WebSocketProvider(process.env.WSS_URL);
        this.contractInstance = new this.web3.eth.Contract(CONTRACT_ABI.abi, CONTRACT_ADDRESS);


    }
    async modifyState(state,gas){
        let transaction = await this.contractInstance.methods.setContractState(state);
        let receipt = await this.send(web3,gas,transaction);
        console.log(receipt);
    }

    async send(web3, gasPrice, transaction) {
        const account = web3.eth.accounts.privateKeyToAccount(process.env.PK).address;
        const options = {
            to      : CONTRACT_ADDRESS,
            data    : transaction.encodeABI(),
            gas     : gasPrice
        };
        const signed  = await web3.eth.accounts.signTransaction(options, process.env.PK);
      
        const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
        return receipt;
    }

}

const States = {
    RAFFLE : 1,
    PREMINT: 2,
    PRESALE: 3,
    MINT: 4,
    OPEN: 5
}
export {ContractAPI, States}