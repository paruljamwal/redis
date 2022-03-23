//redis connection..........................>
const {createClient}=require("redis");

//call create client from redis......

const client=createClient({url:"redis://localhost:6379"});
//when client not able to connect with redis so client.on through an  event named error....and by that callback fnction run......
//If error came so it help to identify......
client.on("error",(err)=>{
    console.error({message:err.message});
});

module.exports=client;
