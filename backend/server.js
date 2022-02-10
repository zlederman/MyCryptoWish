// const admin = require('firebase-admin');
// const { getFirestore, Timestamp, FieldValue } = require('firebase/firestore');
const {ContractAPI,States} = require('./services');
const dateConfig = require('./date-conf.json');
const path = require('path');
const schedule = require('node-schedule');
const express = require('express');
// admin.app.initializeApp();
// const db = getFirestore();
const app = express();
const cronService = CronService(dateConfig);
const contractInstance = ContractAPI(process.env.ABI,process.env.ADDRESS);

app.get('/enter-raffle?',(req,res,next)=>{
    console.log(`INFO: ${res.data.addr} REQUESTS ${res.data.quantity}`);
    next();
})

app.post('/enter-raffle?', async (req,res) => {
    entryData  = req.query;
    let cert = raffleService.createEntry(entryData.address, entryData.numTokens);
    dbService.insert({id: entryData.address, certificate: cert});
})

app.get('/discord-server-cnt', async (req,res) =>{
    //TODO
})

app.get('/count-down',async (req,res) =>{
    let time = dateConfig.presale;
    res.send({"time": time});
})

const raffleJob = schedule.scheduleJob(dates['raffle'],()=>{
    console.log(`INFO: RAFFLE JOB triggered ${Date.now()}`)
    contractInstance.modifyState(States.RAFFLE);
})
const premintJob = schedule.scheduleJob(dates['premint'],()=>{
    console.log(`INFO: PREMINT JOB triggered ${Date.now()}`)
    contractInstance.modifyState(States.PREMINT);
    //sort db and stuff
})

const mintJob = schedule.scheduleJob(dates['mint'],()=>{
    console.log(`INFO: MINT JOB triggered ${Date.now()}`)
    contractInstance.modifyState(States.MINT);
})
const openJob = schedule.scheduleJob(dates['open'],()=>{
    console.log(`INFO: OPEN JOB triggered ${Date.now()}`)
    contractInstance.modifyState(STATES.OPEN);
})

appServer.listen(8080,report('appServer listening on port 8080'));