const express = require('express');
const dotenv=require('dotenv');
const connectDB= require('./config/db');
const chatRouter= require('./routes/chat');
const userRouter=require('./routes/user');
const {notFound,errorHandler}=require('./middleware/errorMiddleware');
const cors= require('cors');

const app=express();
const allowedOrigins= ['http://localhost:3001'];
dotenv.config();

connectDB();

// app.use(
//     cors({
//     origin: allowedOrigins,
// })
// );
app.use(express.json());

app.use('/api/chat',chatRouter);
app.use('/api/user',userRouter);
app.use(notFound);
app.use(errorHandler);;

port = process.env.PORT || 3000;
app.listen(port,console.log('Server started on port',port));

