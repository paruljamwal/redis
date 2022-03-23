const mongoose=require("mongoose");

const productschema=mongoose.Schema({
   brand:{type:String,require:true},
   price:{type:Number,require:true},
   quality:{type:String,require:true},
   color:{type:String},
   size:{type:Number,require:true}


},
{
    timestamps:true,
    versionKey:false
});

const productmodel=mongoose.model("product",productschema);

module.exports=productmodel;