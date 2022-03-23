const mongoose=require("mongoose");


const connect=()=>{
    try{
        console.log("Happy Happy I am connected")
        return mongoose.connect("mongodb+srv://parul:paru@cluster0.hilvq.mongodb.net/redis?retryWrites=true&w=majority");
    }
    catch(err){
        console.log("Something went wrong in connection");
    }
  
}

module.exports=connect;