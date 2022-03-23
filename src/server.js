const app=require("./index");
const connect=require("./config/db")
app.listen(4000,async()=>{
    try{
        console.log("Listinig port 4000");
       return await connect()
        
    }
    catch(err){
         console.log(err)
    }
})