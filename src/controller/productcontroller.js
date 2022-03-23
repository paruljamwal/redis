
const express = require("express");
const productmodel=require("../model/productmodel");
const router=express.Router();
const client=require("../config/redis");
//post----------------------------------------->
 router.post("",async(req,res)=>{
     try{
        
         const product=await productmodel.create(req.body);
         //fetch data.
         const userproducts=await productmodel.find({}).lean().exec();
         //In redis data is stored in string formet.
         //set take key and value.
         client.set("userproducts",JSON.stringify(userproducts));
         return res.status(200).send(product);
        
     }
     catch(err){
      return res.status(404).send(err);


     }
 });


//get------------------------------------------->
router.get("",async(req,res)=>{
    try{
         client.get("userproducts",async function(err,fetchproducts){
             if(fetchproducts){
                 const userproducts=JSON.parse(fetchproducts);
                 return res.status(202).send({userproducts,redis:true});
             }
             else{
                 try{
                    const userproducts=await productmodel.find({}).lean().exec();
                    client.set("userproducts",JSON.stringify(userproducts));
                    return res.status(202).send({userproducts,redis:false});
                 }
                 catch(err){
                     return res.status(404).send(err)
                 }
              
                }
         });
        
       
    }
    catch(err){
        return res.status(404).send("Somthing went wrong please try again later");
    }




});

//get single item------------------------------->
router.get("/:id",async(req,res)=>{
    try{
        client.get("userproducts",async function(err,fetchproducts){
             if(fetchproducts){
                 const userproducts=JSON.parse(fetchproducts);
                 return res.status(200).send({userproducts,redis:true});
             }
             else{
                 try{
                    const product=await productmodel.findById(req.params.id).lean().exec();
                     client.set(`userproducts.${req.params.id}`,JSON.stringify(product));
                     return res.status(202).send({product:product,redis:false});
                }
                 catch(err){
                    return res.status(404).send(err);
                 }
             }
        })


    }
    catch(err){
        return res.status(404).send("Somthing went wrong please try again later");
    }

});
//patch----------------------------------------->
router.patch("/:id",async(req,res)=>{
    try{

        const product=await productmodel.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
        client.set(`userproducts.${req.params.id}`,JSON.stringify(product))
        client.set("userproducts",JSON.stringify(userproducts));
        return res.status(202).send(product);
    }
    catch(err){
        return res.status(404).send("Somthing went wrong please try again later");
    }



})
//delete----------------------------------------->
router.delete("/:id",async(req,res)=>{
    try{

        const product=await productmodel.findByIdAndDelete(req.params.id).lean().exec();
        const userproducts=await productmodel.find({}).lean().exec();
    //delete from redis also
        client.del(`userproducts.${req.params.id}`);
        client.set("userproducts",JSON.stringify(product));
        return res.status(202).send(product);
    }
    catch(err){
        return res.status(404).send("Somthing went wrong please try again later");
    }
})

module.exports=router;