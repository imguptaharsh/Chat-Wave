const express = require('express');
const router= express.Router();
const Chat=require('../controllers/chat');

router.get('/api/chats',Chat.getChat)
router.get('/api/chats/:id',Chat.getChatByID)


exports=module.exports=router;