const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const hash = require("md5");
const dburl = "mongodb+srv://udityaprakash01:sAMc1FmiB4wWnxAx@cluster0.za5wk8j.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyparser.json());

// const dburl = "mongodb://localhost:27017";
app.use(bodyparser.urlencoded({extended:false}));
function DBconnection(){
    mongoose.connect(dburl,(err)=>{
        if(err){
            console.log("Failed To Connect To Database. \n Retrying...");
            DBconnection();
        }else{
            console.log("success");
        }
    });
}
DBconnection();

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
});
app.post("/register",async (req,res)=>{
    // console.log(typeof(req.body.name)+" "+req.body.name+"\n"+typeof(req.body.email)+" "+req.body.email+"\n");
    console.log(req.body);
    if(typeof(req.body.name)!='undefined' 
    && typeof( req.body.password)!='undefined' && typeof( req.body.email)!='undefined' 
    && typeof( req.body.mobile)!='undefined'){
        var info = new user({
            name:req.body.name,
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

    }else{
        res.json({status:"Invalid",
        msg:"One of the field Found Missing"});
    }

});


app.listen(3000 ,()=>{
    console.log("server started");
});