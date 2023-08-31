const express = require('express');
const router= express.Router();
const Chat=require('../controllers/chat');

router.get('/',Chat.getChat);
router.get('/:id',Chat.getChatByID);


module.exports=router;