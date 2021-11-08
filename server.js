const express = require('express');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const path = require('path');
const WebSocket = require('ws')
const web3 = require('web3');
const schedule = require('node-schedule');
const appSockets = express();
const appServer = express();

const CONTRACT_ADDRESS = "0x7b83B171c3d75b35276BD379BF48249119FC9E29";
const CONTRACT_ABI = require('./client/src/contracts/PaymentHandler.json');
const RAFFLE_TOPIC = "0x0caab1a325caae32148db4a8c14466a83a84b5e074b83e4dced52ea46c6b003f"

const CONTRACT_OPTIONS = [
    "logs",
    {
        "address":CONTRACT_ADDRESS,
        "topic":[RAFFLE_TOPIC]
    }
]
const WS_OPTIONS = {
    "jsonrpc":"2.0",
    "id":"1",
    "method":"eth_subscribe",
    "params":CONTRACT_OPTIONS
}
const web3Instance = new web3(
    new Web3.providers.WebsocketProvider(process.env.WSS_URL)
);
const ws = new WebSocket(process.env.WSS_URL);
const contractInstance = web3Instance.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);


async function send(web3, gasPrice, transaction) {
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PK).address;
    const options = {
        to      : transaction._parent._address,
        data    : transaction.encodeABI(),
        gas     : await transaction.estimateGas({from: account}),
        gasPrice: gasPrice
    };
    const signed  = await web3.eth.accounts.signTransaction(options, process.env.PK);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return receipt;
}

const dates = {
    'presale':new Date(2021,11,21,23,59),
    'raffle': new Date(2021,11,25,23,59),
    'premint':new Date(2021,11,26,23,59),
    'mint':new Date(2021,11,27,23,59),
    'open':new Date(2021,11,30,23,59),
}

const setRaffleJob = schedule.scheduleJob(dates['raffle'],async() =>{
    let transaction = contractInstance.methods.setState(2);
    let receipt = await send(web3Instance,25000,transaction);
})
const setPreMintJob = schedule.scheduleJob(dates['premint'],async() =>{
    let transaction = contractInstance.methods.setState(3);
    let receipt = await send(web3Instance,25000,transaction);
})
const setMintJob = schedule.scheduleJob(dates['mint'],async() =>{
    let transaction = contractInstance.methods.setState(4);
    let reciept = await send(web3Instance,25000,transaction);
})
const setOpenJob = schedule.scheduleJob(dates['open'],async ()=>{
    let transaction = contractInstance.methods.setState(5);
    let reciept = await send(web3Instance,25000,transaction);
})


ws.onopen = function(){
    console.log("opened connection to eth-node")
    ws.send(`${WS_OPTIONS}`)
}
ws.onmessage = function (evt) {
    json = JSON.parse(evt.data)
    const size = 64
    const numChunks = 3
    let chunks = Array(3)
    if(json['params']){
        res = json.params.result
        data = res.data.substr(2);
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = data.substr(o, size)
        }
        address = '0x' + chunks[0];
        numEntries = int(chunks[1]);
        lastIndex = int(chunks[2]);
        raffleEntries = Array(numEntries);
        for(let i = 0; i < numEntries; i++){
            tokenIds.push(--lastIndex);
        }
        payload = {address: address, raffleEntries: raffleEntries};
        console.log(payload)
        //post payload to db
    }


};
ws.onclose = function () {
    // websocket is closed.
    console.log("Connection closed...");
};



appServer.get('getRaffleTickets', (req,res) => {
//get user raffle tokens from their address
//return list of ids
})


appServer.listen(8080,console.log('appServer listening on port 8080'));
appSockets.listen(430,console.log('appSockets listenin on port 430'));



