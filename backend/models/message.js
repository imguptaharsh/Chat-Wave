const mongoose= require('mongoose');
const {Schema}=mongoose;

const messageSchema=new Schema(
    {
        sender:{tupe:mongoose.Schema.Types.ObjectId,ref:'User'},
        chat:{type:mongoose.Schema.Types.ObjectId,ref:'Chat'},
        content:{type:String,trim:true},
        readBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
    },
    {timestamps:true}
);

module.exports=mongoose.model('Message',messageSchema);