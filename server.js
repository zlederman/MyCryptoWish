const express = require('express');
const web3 = require('web3');
const schedule = require('node-schedule');
const date = new Date(2012, 11, 21, 5, 30, 0);
const app = express()


schedule.scheduleJob(date, () => {
    //set raffle state
   
});



