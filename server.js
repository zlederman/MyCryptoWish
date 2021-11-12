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
const CONTRACT_ADDRESS = process.argv[2] ? process.argv[2] : process.env.CONTRACT_ADDRESS; //works when running build.sh
const CONTRACT_ABI = require('./client/src/contracts/PaymentHandler.json'); 
const RAFFLE_TOPIC = process.env.RAFFLE_TOPIC;


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

const ws = new WebSocket(process.env.WSS_URL);
redisClient.on('connect',()=>{
    report('connected to redis');
    redisClient.ping()
})
redisClient.get = util.promisify(redisClient.get);
redisClient.set = util.promisify(redisClient.set);

async function send(web3, gasPrice, transaction) {
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

const dates = {
    'presale':new Date(2021,11,21,23,59),
    'raffle': new Date(2021,11,25,23,59),
    'premint':new Date(2021,11,26,23,59),
    'mint':new Date(2021,11,27,23,59),
    'open':new Date(2021,11,30,23,59),
};


  
    


const setRaffleJob = schedule.scheduleJob(dates['raffle'],async() =>{
    
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI.abi,CONTRACT_ADDRESS);
    let transaction = await contractInstance.methods.setState(2);
    let receipt = await send(web3Instance,12e6,transaction);
})
const setPreMintJob = schedule.scheduleJob(dates['premint'],async() =>{
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI.abi,CONTRACT_ADDRESS);
    let transaction = await contractInstance.methods.setState(3);
    let receipt = await send(web3Instance,12e6,transaction);
})
const setMintJob = schedule.scheduleJob(dates['mint'],async() =>{
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI.abi,CONTRACT_ADDRESS);
    let transaction = await contractInstance.methods.setState(4);
    let reciept = await send(web3Instance,12e6,transaction);
})
const setOpenJob = schedule.scheduleJob(dates['open'],async ()=>{
    const web3Instance = new web3(
        new Web3.providers.WebsocketProvider(process.env.WSS_URL)
    );
    const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI.abi,CONTRACT_ADDRESS);
    let transaction = await contractInstance.methods.setState(5);
    let reciept = await send(web3Instance,12e6,transaction);
})

const report = (info) => {
    
    console.log("> "+info)
    console.log("----------------------------------")
}
    

ws.onopen = function(){
    report("opened connection to eth-node")
    ws.send(JSON.stringify(WS_OPTIONS))
}
ws.onmessage = async function (evt) {
    report('msg recieved from eth-node')
    json = JSON.parse(evt.data)
    if(json['params']){
        res = json.params.result
        data = res.data.substr(2);
        payload = parse(data);
        report(payload)
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

const loadRedis = async (payload) => {
    let value = payload.raffleEntries.toString();
    try {
        value += await redisClient.get(payload.address);
    }catch(e){
        console.log(e)
    }
    await redisClient.set(
        payload.address,
        value
     )
}
ws.onclose = function () {
    // websocket is closed.
    report("Connection closed...");
};



appServer.get('/raffle', async (req,res) => {
    address = req.query.id.toLowerCase();
    raffleTickets = await redisClient.get(address);
    res.send(JSON.stringify({tickets: raffleTickets}))
})


appServer.listen(8080,report('appServer listening on port 8080'));




