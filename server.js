const express = require('express');
const path = require('path');
const WebSocket = require('ws')
const web3 = require('web3');
const schedule = require('node-schedule');
const appSockets = express();
const appServer = express();

const CONTRACT_ADDRESS = "0x5D37B393889185c14A4aA25D9d87FcBfc8d696Be"; //change before running server
const CONTRACT_ABI = require('./client/src/contracts/PaymentHandler.json'); 
const RAFFLE_TOPIC = "0x0caab1a325caae32148db4a8c14466a83a84b5e074b83e4dced52ea46c6b003f" 
const WSS_URL = "wss://kovan.infura.io/ws/v3/123d564490cd4062800d63c13c221bd5"
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

const ws = new WebSocket(WSS_URL);
// const contractInstance = web3Instance.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);


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
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    let transaction = contractInstance.methods.setState(2);
    let receipt = await send(web3Instance,25000,transaction);
})
const setPreMintJob = schedule.scheduleJob(dates['premint'],async() =>{
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    let transaction = contractInstance.methods.setState(3);
    let receipt = await send(web3Instance,25000,transaction);
})
const setMintJob = schedule.scheduleJob(dates['mint'],async() =>{
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    let transaction = contractInstance.methods.setState(4);
    let reciept = await send(web3Instance,25000,transaction);
})
const setOpenJob = schedule.scheduleJob(dates['open'],async ()=>{
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    let transaction = contractInstance.methods.setState(5);
    let reciept = await send(web3Instance,25000,transaction);
})


ws.onopen = function(){
    console.log("opened connection to eth-node")
    ws.send(JSON.stringify(WS_OPTIONS))
}
ws.onmessage = function (evt) {
    console.log('msg recieved from eth-node')
    json = JSON.parse(evt.data)
    if(json['params']){
        res = json.params.result
        data = res.data.substr(2);
        payload = parse(data);
        console.log(payload)

        //post payload to db
    }
}
setInterval(()=>{
    ws.ping()
},3.54e6)

const parse = (data) => {
    const size = 64
    const numChunks = 3
    let chunks = Array(3)
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = data.substr(o, size)
    }
    address = '0x' + chunks[0];
    numEntries = parseInt(chunks[1]);
    lastIndex = parseInt(chunks[2]);
    raffleEntries = Array(numEntries);
    for(let i = 0; i < numEntries; i++){
        raffleEntries.push(--lastIndex);
    }
    payload = {address: address, raffleEntries: raffleEntries};
    return payload;

}
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



