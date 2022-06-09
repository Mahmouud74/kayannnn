const client = require('express').Router();
const clientModel = require('../models/client.model');
const nodeMailer = require('nodemailer');
const jwt=require('jsonwebtoken');
const {check , validationResult} = require('express-validator');
// let transporter = nodemailer.createTransport({
//     host: "admin@kayan-egypt.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });
  
client.post("/sendmessage",
check('clientPhone').matches(/^(01)[0512][0-9]{8}$/),async(req,res)=>{
    const { clientName , clientPhone , clientMail , clientMessage } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        await clientModel.insertMany({clientName , clientPhone , clientMail , clientMessage});

        res.json({message:"your message sent succesfully"});
    }
    else{
        res.json(errors.array());
    }
})
client.get('/clientmessages',async(req,res)=>{
    const messages = await clientModel.find({});
    if(messages[0]){
        res.json({messages});
    }
    else{
        res.json({message:"there is no messages"});
    }
})
client.delete("/deleteallmessages",async(req,res)=>{
    const {token}=req.body;
    jwt.verify(token , 'admin' , async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"})
        }
        else{
          await clientModel.deleteMany({});
          res.json({message:"All Messages Deleted sucessfully"});
        }
    })
})
client.delete("/deleteclientmessages/:id",async(req,res)=>{
    const {token}=req.body;
    let clientId = req.params.id;
    jwt.verify(token , 'admin' , async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"})
        }
        else{
            let clientMessage = await clientModel.findOne({_id:clientId});
            if(clientMessage){
                await clientModel.deleteOne({_id:clientId});
                res.json({message:"Client Message Deleted sucessfully"});
            }
            else{
                res.json({message:"Invalid Id"});
            }
        }
    })
})
module.exports=client