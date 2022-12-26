const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const hash = require("md5");
const dburl = "mongodb+srv://udityaprakash01:sAMc1FmiB4wWnxAx@cluster0.za5wk8j.mongodb.net/?retryWrites=true&w=majority";

// const dburl = "mongodb://localhost:27017";
mongoose.connect(dburl,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("success");
    }
});

const ClientSchema = new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    mobile:Number
});

var user = new mongoose.model('UserDB',ClientSchema);
const send = {
    status: {code: 200,msg:"Ok Status"},
    msg:"Api is ready to Serve"
}
app.get("/",(req,res)=>{
    res.json(send);
});

app.get("/register",(req,res)=>{
    res.json({
        status:"all set at register Page"
    });
}).post("/register",async (req,res)=>{
    var info = new user({
        name:req.body.username,
        password:hash(req.body.password),
        email: req.body.email,
        mobile: req.body.mobile
    });

    await info.save().then((user)=>{
        res.json(
            {
                status:"success",
                msg:"User Has Been Recorded"
            }
        );
    }).catch((err)=>{
        res.json({
            status:"Failure",
            msgerr:err,
            msg:"User Has not Been Recorded"
        })
    })
});


app.listen(3000 ,()=>{
    console.log("server started");
});