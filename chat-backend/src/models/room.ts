import {model,Schema} from "mongoose"


const Roomschema=new Schema({

    roomid:{type:String,required:true},
    userid:{type:String,required:true},
    roomname:{type:String,required:true},
    createdate:{type:Date,default:Date.now},

})

export default model ("rooms",Roomschema);