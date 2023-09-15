const express = require('express');
const router= express.Router();
const Chat=require('../controllers/chat');
const { protect } = require('../middleware/protect');

router.
post('/',protect,Chat.accessChat)
.get('/',protect,Chat.fetchChats)
.post('/group',protect,Chat.createGroupChat)
.put('/rename',protect,Chat.renameGroup)
.put('/groupremove',protect,Chat.removeFromGroup)
.put('/groupadd',protect,Chat.addToGroup);


module.exports=router;