const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const {ContractAPI,States} = require('services');
const dateConfig = require('./date-conf.json');
const path = require('path');
const schedule = require('node-schedule');
const express = require('express');
initializeApp();
const db = getFirestore();
const app = express();
const cronService = CronService(dateConfig);
const contractInstance = ContractAPI(process.env.ABI,process.env.ADDRESS);



app.post('/enter-raffle', async (req,res) => {
    entryData  = req.query;
    let cert = raffleService.createEntry(entryData.address, entryData.numTokens);
    dbService.insert({id: entryData.address, certificate: cert});
})

app.get('/discord-server-cnt', async (req,res) =>{
    //TODO
})


const raffleJob = schedule.scheduleJob(dates['raffle'],()=>{
    contractInstance.modifyState(States.RAFFLE);
})
const premintJob = schedule.scheduleJob(dates['premint'],()=>{
    contractInstance.modifyState(States.PREMINT);
    //sort db and stuff
})

const mintJob = schedule.scheduleJob(dates['mint'],()=>{
    contractInstance.modifyState(States.MINT);
})
const openJob = schedule.scheduleJob(dates['open'],()=>{
    contractInstance.modifyState(STATES.OPEN);
})

appServer.listen(8080,report('appServer listening on port 8080'));