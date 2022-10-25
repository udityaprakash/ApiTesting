const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const dburl = "mongodb+srv://Uditya:Requirepass-82@cluster0.srwbhmx.mongodb.net/test";
mongoose.connect(dburl+"dbtest");
app.get("/",(req,res)=>{
    res.send('page initialised');
});

app.listen(process.env.PORT|| 3000 ,()=>{
    console.log("server started");
});