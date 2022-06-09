const contactsMethods = require('express').Router();
const jwt=require('jsonwebtoken');
const contactModel = require('../models/contact.model');
contactsMethods.get('/contactMethods',async(req,res)=>{
    const Methods = await contactModel.find({});
    if(Methods[0]){
        res.json({Methods});
    }
    else{
        res.json({message:"there is no contact Methods"})
    }
})

contactsMethods.delete('/deletecontact/:id',async(req,res)=>{
    const {token}=req.body;
    let contactId = req.params.id;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            let Methods = await contactModel.findOne({_id:contactId});
            if(Methods){
                await contactModel.deleteOne({_id:contactId});
                Methods = await contactModel.findOne({_id:contactId});
                if(Methods === null){
                    res.json({message:"contact Methods deleted succesfully"})
                }  
                else{
                    res.json({message:"error in deletion"})
                }
            }
            else{
                res.json({message:"invalid Id"});
            }
        }
    })
})
contactsMethods.put('/editcontact/:id',async(req,res)=>{
    const {contactPhone,contactMail,contactFax,contactMobile,token} = req.body
    let contactId = req.params.id
    jwt.verify(token , 'admin' , async (err,decodded)=>{
        if(err){
            res.json({message:"error in token"});
        }
        else{
            let Method = await contactModel.findOne({_id:contactId});
            if(Method){
               //await contactModel.update({contactPhone , contactFax , contactMail , contactMobile},{where:{contactId}});
               await contactModel.updateMany({_id:contactId},{$set:{contactPhone , contactFax , contactMail , contactMobile}});

               res.json({message:"Contact Methods updated"})
                // if((contactPhone&&contactPhone!==null)&&(contactFax&&contactFax!==null)
                // &&(contactMail&&contactMail!==null)){
                //     await contactModel.update({contactPhone , contactFax , contactMail},{where:{contactId}});
                //     res.json({message:"Contact Methods updated"})
                // }
                // else if((contactPhone&&contactPhone!==null)&&(contactFax&&contactFax!==null)){
                //     await contactModel.update({contactPhone , contactFax, contactMail:Method.contactMail},{where:{contactId}});
                //     res.json({message:"Contact Phone and contactFax and contactMobile updated"})
                // }
                // else if((contactPhone&&contactPhone!==null)&&(contactMail&&contactMail!==null)){
                //     await contactModel.update({contactPhone , contactFax:Method.contactFax , contactMail},{where:{contactId}});
                //     res.json({message:"Contact Phone and Contact Mail updated"})
                // }
                // else if ((contactMail&&contactMail!==null)&&(contactFax&&contactFax!==null)){
                //     await contactModel.update({contactPhone:Method.contactPhone , contactFax , contactMail},{where:{contactId}});
                //     res.json({message:"Contact Fax and Contact Mail updated"});
                // }
                // else if ((contactPhone&&contactPhone!==null)){
                //     await contactModel.update({contactPhone, contactFax:Method.contactFax , contactMail:Method.contactMail},{where:{contactId}});
                //     res.json({message:"Contact Phone updated"});
                // }
                // else if ((contactFax&&contactFax!==null)){
                //     await contactModel.update({contactPhone:Method.contactPhone , contactFax , contactMail:Method.contactMail},{where:{contactId}});
                //     res.json({message:"Contact Fax updated"});
                // }
                // else if ((contactMail&&contactMail!==null)){
                //     await contactModel.update({contactPhone:Method.contactPhone , contactFax:Method.contactFax , contactMail},{where:{contactId}});
                //     res.json({message:"Contact Mail updated"});
                // }
                // else{
                //     res.json({message:"NOthing updated"});
                // }
            }
        }
    })
})
module.exports = contactsMethods