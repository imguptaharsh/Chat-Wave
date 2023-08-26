const express = require('express');
const dotenv=require('dotenv');
const  Router= require('./routes/chat');

const app=express();
dotenv.config();

app.use(express.json());

app.use('/',Router);
port = process.env.PORT || 5000;
app.listen(port,console.log('Server started on port 3000'));

