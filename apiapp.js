const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const dburl = "mongodb+srv://udityaprakash01:sAMc1FmiB4wWnxAx@cluster0.za5wk8j.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dburl+"dbtest",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("success");
    }
});
const se = {
    status: "Success",
    msg:"Yeh made my first API"
}
app.get("/",(req,res)=>{
    res.json(se);
});

app.listen(3000 ,()=>{
    console.log("server started");
});