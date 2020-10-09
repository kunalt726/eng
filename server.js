const express=require("express");
const app = express();
const cors = require("cors");
const axios = require('axios').default;
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once("open", ()=>{
  console.log("MongoDB database connection established succesfully");
});
const hospitalSchema= new mongoose.Schema({
  name: String,
  age: String,
  disease: String,
  old_disease: String,
  address: String
});
const Data = mongoose.model("Data",hospitalSchema);
app.post("/message",function(req,res){
  const data = new Data ({
    name: req.body.name,
    age: req.body.age,
    disease: req.body.Current_Diseases,
    old_disease: req.body.Old_Diseases,
    address: req.body.Address
  })
  data.save(function(err){
    if(err){
      console.log(err)


    
  })
  res.redirect("/")
})
app.listen(3000,function(){
  console.log("Server Started on port 3000")
});

app.get("/",function(req,res){
  res.sendFile(__dirname + '/index.html')
});
