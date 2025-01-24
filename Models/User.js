const mongoose = require('mongoose')

const url = "mongodb://127.0.0.1:27017/chat-app"

async function getConnect(){
   await mongoose.connect(url)
}
getConnect()
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image: {
        type: String, 
        default: null
      }

},
{timestamp:true}

)
module.exports=mongoose.model("users",schema) 