import express from 'express'
import { ExpressInstance } from './app';

require('dotenv').config();

const port = process.env.PORT || 3002;
const env = process.env.NODE_ENV || 'development';
const app : express.Application = ExpressInstance.getInstance().getApp();

app.listen(port, () =>{
    console.log(`=================================`);
    console.log(`======= ENV: ${env} =======`);
    console.log(`🚀 App listening on the port ${port}`);
    console.log(`=================================`);

})

app.get('/', (req, res) => {
    res.send("Success");
})
