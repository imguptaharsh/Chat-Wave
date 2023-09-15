const express = require('express');
const router= express.Router();
const User= require('../controllers/user');
const {protect}= require('../middleware/protect');
router
    .post('/',User.registerUser)
    .post('/login/',User.authUser)
    .get('/',protect,User.getAllUsers)
module.exports=router; 