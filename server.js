const express = require('express');
const path = require('path');
const WebSocket = require('ws')
const server = require('http').createServer();
const app = express();


const ws = new WebSocket('wss://kovan.infura.io/ws/v3/123d564490cd4062800d63c13c221bd5');

ws.onopen = function(){
    console.log("opened")
    ws.send(`{"jsonrpc":"2.0","id": 1,"method": "eth_subscribe","params":["logs",{"address":"0x7b83B171c3d75b35276BD379BF48249119FC9E29","topics":["0x0caab1a325caae32148db4a8c14466a83a84b5e074b83e4dced52ea46c6b003f"]}]}`)
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
    }


};

ws.onclose = function () {
    // websocket is closed.
    console.log("Connection closed...");
};



const schedule = require('node-schedule');



const dates ={
    'presale':new Date(2021,11,21,23,59),
    'raffle': new Date(2021,11,25,23,59),
    'premint':new Date(2021,11,26,23,59),
    'mint':new Date(2021,11,27,23,59),
    'open':new Date(2021,11,30,23,59),
}







server.on('request', app);
server.listen(8080,console.log(8080))
// const setRaffleJob = schedule.scheduleJob(dates['raffle'],async() =>{
//     console.log('raffle set')
// })
// const setPreMintJob = schedule.scheduleJob(dates['premint'],async() =>{
//     console.log('raffle set')
// })
// const setMintJob = schedule.scheduleJob(dates['mint'],async() =>{
//     console.log('raffle set')
// })
// const setOpenJob = schedule.scheduleJob(dates['open'],async ()=>{
//     console.log('open set')
// })