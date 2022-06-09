const services = require('express').Router();
const jwt=require('jsonwebtoken');
const serviceModel = require('../models/service.model');
const servicesModel = require("../models/service.model");
services.get('/ourservices',async(req,res)=>{
    let services = await servicesModel.find({});
    if(services[0]){
        res.json({message:"success",services})
    }
    else{
        res.json({message:"there is no services"})
    }
})
services.put('/editservice/:id',async(req,res)=>{
    let serviceId= req.params.id
    const {token , serviceTitle , serviceContent} = req.body;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            let service = await servicesModel.findOne({_id:serviceId});
            if(service){
                if((serviceTitle&&serviceTitle!==null)&&(serviceContent&&serviceContent!==null)){
                   let  tempService = await servicesModel.findOne({serviceTitle});
                    if(tempService===null){
                       // await servicesModel.updateMany({serviceTitle , serviceContent},{where:{serviceId}});
                        await serviceModel.updateMany({_id:serviceId},{$set:{serviceTitle , serviceContent}});
                        res.json({message:"service Updated"})
                    }
                    else{
                        res.json({message:"service title was used by another service"})
                    }
                }
                else if(serviceTitle&&serviceTitle!==null){
                   let tempService = await servicesModel.findOne({serviceTitle});
                    if(tempService===null){
                        await serviceModel.updateMany({_id:serviceId},{$set:{serviceTitle , serviceContent:service.serviceContent}});
                        res.json({message:"service Title Updated"})
                    }
                    else{
                        res.json({message:"service title was used by another service"})
                    }
                }
                else if (serviceContent&&serviceContent!==null){
                   // await servicesModel.update({serviceTitle:service.serviceTitle,serviceContent},{where:{serviceId}});
                    await serviceModel.updateMany({_id:serviceId},{$set:{serviceTitle:service.serviceTitle , serviceContent}});
                    res.json({message:"service Content Updated"})
                }
                else{
                    //await servicesModel.update({serviceTitle:service.serviceTitle,serviceContent:service.serviceContent},{where:{serviceId}});
                    await serviceModel.updateMany({_id:serviceId},{$set:{serviceTitle:service.serviceTitle , serviceContent:service.serviceContent}});
                    res.json({message:"nothing updated"})
                }
            }
            else{
                res.json({message:"invalid Id"});
            }
        }
    })

})
services.post('/addservice',async(req,res)=>{
    const {token , serviceContent , serviceTitle}=req.body
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            let service = await servicesModel.findOne({serviceTitle});
            if(service===null){
                await servicesModel.insertMany({serviceTitle , serviceContent});
                res.json({message:"new service section added"});
            }
            else{
                res.json({message:"this title was used by another service"})
            }
            }
    })
})
services.delete('/deleteservice/:id',async(req,res)=>{
    let serviceId = req.params.id;
    const {token} = req.body;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        console.log(token);     
        if(err){
            res.json({message:"there is error in token" , err});
            
        }
        else{
            let service = await servicesModel.findOne({_id:serviceId});
            if(service){
                await servicesModel.deleteOne({_id:serviceId})
                service = await servicesModel.findOne({_id:serviceId});
                if(service===null){
                    res.json({message:"service deleted succesfully"})
                }
                else{
                    res.json({message:"service didn't deleted"})
                }
            }
            else{
                res.json({message:"invalid Id"})
            }
        }
    })
})
module.exports=services