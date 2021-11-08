const express = require('express');
const path = require('path');
const WebSocket = require('ws')
const web3 = require('web3');
const redis = require('redis')
const schedule = require('node-schedule');
const appSockets = express();
const appServer = express();

const redisClient = redis.createClient('6379','127.0.0.1');
const CONTRACT_ADDRESS = "0x5A22534eD9aA1f35A284b748459e250fb159A163"; //change before running server
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
redisClient.on('connect',()=>{
    console.log('connected to redis');
    redisClient.ping()
})
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
        redisClient.set(
           payload.address,
           payload.raffleEntries.toString()
        )

        //post payload to db
    }
}
setInterval(()=>{
    ws.ping()
},3.54e6)

const parse = (data) => {
    const size = 64
    const numChunks = 3
    raffleEntries = [];
    let chunks = Array(3)
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = data.substr(o, size)
    } 
    address = "0x" + parseInt(chunks[0],16).toString(16);
    numEntries = parseInt(chunks[1],16);
    lastIndex = parseInt(chunks[2],16);

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



appServer.get('getraffletix', (req,res) => {
    address = req.body.address;
    raffleTickets = redisClient.get(address).split(",");
    res.send(JSON.stringify({tickets: raffleTickets}))
})


appServer.listen(8080,console.log('appServer listening on port 8080'));
appSockets.listen(430,console.log('appSockets listenin on port 430'));



