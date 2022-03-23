const express=require("express");
const productcontroller=require("./controller/productcontroller");
const app=express();
// app.use(express)
app.use(express.json())
app.use("/product",productcontroller);

module.exports=app;