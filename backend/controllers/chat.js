const Chats = require('../data/data');

exports.get= (req,res)=>{
    res.send('get');
}
exports.getChat= (req,res)=>{
    res.send(Chats);
    // res.send(json(Chats));
    // res.json(Chats);
}
exports.getChatByID= (req,res)=>{
    const id=+req.params.id;
    const chat=Chats.find((c)=>c.id===Number(id))
    res.send(chat);
    // res.json(Chats);
}
exports.postChat= (req,res)=>{
    res.send('postChat');
}  