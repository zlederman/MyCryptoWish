const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const web3 = require('web3');
const redis = require('redis');
require('dotenv').config({ path: '/Users/zlederman/Documents/Code/js/truffle-react/.env' })
const schedule = require('node-schedule');
const appSockets = express();
const util = require('util');

const appServer = express();

const redisClient = redis.createClient(process.env.REDIS_PORT,'127.0.0.1');
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;//change before running server
const CONTRACT_ABI = require('./client/src/contracts/PaymentHandler.json'); 
const RAFFLE_TOPIC = process.env.RAFFLE_TOPIC;
const WSS_URL = process.env.WSS_URL;

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
redisClient.get = util.promisify(redisClient.get);
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
ws.onmessage = async function (evt) {
    console.log('msg recieved from eth-node')
    json = JSON.parse(evt.data)
    if(json['params']){
        res = json.params.result
        data = res.data.substr(2);
        payload = parse(data);
        console.log(payload)
        await redisClient.set(
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
    address = "0x" + chunks[0].substr(24);
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



appServer.get('/raffle', async (req,res) => {
    address = req.query.id.toLowerCase();
    raffleTickets = await redisClient.get(address);
    res.send(JSON.stringify({tickets: raffleTickets}))
})


appServer.listen(8080,console.log('appServer listening on port 8080'));




