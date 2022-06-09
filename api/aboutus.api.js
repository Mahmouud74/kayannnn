const aboutus = require('express').Router();
const aboutusModel=require('../models/about.model');
const aboutHeaderModel = require('../models/aboutHeader.model')
const jwt = require('jsonwebtoken')
aboutus.get('/aboutuscontent',async(req,res)=>{
    let about = await  aboutusModel.find({});
    if(about[0]){
        res.json({about});
    }
    else{
        res.json({message:"there is no about section"})
    }
})
aboutus.get('/aboutheader',async(req,res)=>{
    let aboutHeader = await  aboutHeaderModel.find({} );
    if(aboutHeader[0]){
        res.json({aboutHeader});
    }
    else{
        res.json({message:"there is no about Header"})
    }
})
aboutus.put('/updateaboutheader/:id',async(req,res)=>{
    let aboutHeaderId = req.params.id
    const {token , aboutHeaderContent} = req.body
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            // let aboutHeader = await aboutHeaderModel.findOne({raw:true,where:{aboutHeaderId}});
            let aboutHeader = await  aboutHeaderModel.find({_id : aboutHeaderId} );
            if(aboutHeader){
                if((aboutHeaderContent&&aboutHeaderContent!==null)){
                    //await aboutHeaderModel.updateMany({aboutHeaderContent:aboutHeaderContent},{where:{aboutHeaderId}});
                    await aboutHeaderModel.updateMany({_id : aboutHeaderId},{$set:{aboutHeaderContent:aboutHeaderContent}});

                    res.json({message : "UPDATED"})
                }
                else{
                    await aboutHeaderModel.updateMany({aboutHeaderContent:aboutHeader.aboutHeaderContent},{where:{aboutHeaderId}});     
                    await aboutHeaderModel.updateMany({_id : aboutHeaderId},{$set:{aboutHeaderContent:aboutHeader.aboutHeaderContent}});
                    res.json({message:"nothing updated"})
                }
        
            }
            else{
                res.json({message:"there is no about Header"})
            }
        }
    })
})
aboutus.put('/editabout/:id',async(req,res)=>{
    let aboutId = req.params.id;
    const {token , aboutTitle , aboutContent} = req.body;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            //let about = await aboutusModel.findOne({raw:true,where:{aboutId:_id}});
            let about = await  aboutusModel.findOne({_id:aboutId});
            if(about){
                if ((aboutTitle&&aboutTitle!==null)&&(aboutContent&&aboutContent!==null)){
                    //let tempAbout = await aboutusModel.findOne({raw:true,where:{aboutTitle}});
                    let tempAbout = await  aboutusModel.findOne({aboutTitle});
                    if(tempAbout){
                        res.json({message:"aboutTitle was used bs another section"})
                    }
                    else{
                        //await aboutusModel.update({aboutTitle :aboutTitle , aboutContent:aboutContent},{where:{aboutId}});
                        await aboutusModel.updateMany({_id : aboutId},{$set:{aboutContent:aboutContent ,aboutTitle:aboutTitle}});
                        res.json({message:"about updated"});
                    }     
                }
                else if(aboutTitle&&aboutTitle!==null){
                   // let tempAbout = await aboutusModel.findOne({raw:true,where:{aboutTitle}});
                    let tempAbout = await  aboutusModel.findOne({aboutTitle});
                    if(tempAbout){
                        res.json({message:"aboutTitle was used bs another section"})
                    }
                    else{
                       // await aboutusModel.update({aboutTitle :aboutTitle , aboutContent:about.aboutContent},{where:{aboutId}});
                        await aboutusModel.updateMany({_id : aboutId},{$set:{aboutContent:about.aboutContent ,aboutTitle:aboutTitle}});
                        res.json({message:"aboutTitle updated"});
                    }
                }
                else if(aboutContent&&aboutContent!==null){
                    //await aboutusModel.update({aboutTitle :about.aboutTitle , aboutContent:aboutContent},{where:{aboutId}});
                    await aboutusModel.updateMany({_id : aboutId},{$set:{aboutContent:aboutContent ,aboutTitle:about.aboutTitle}});
                    res.json({message:"aboutContent updated"});
                }
                else{
                    //await aboutusModel.update({aboutTitle :about.aboutTitle , aboutContent:about.aboutContent},{where:{aboutId}});
                    await aboutusModel.updateMany({_id : aboutId},{$set:{aboutContent:about.aboutContent ,aboutTitle:about.aboutTitle}});
                    res.json({message:"nothing updated"})
                }
            }
            else{
                res.json({message:"invalid Id"})
            }
    }  
    })

})
aboutus.post('/addabout',async(req,res)=>{
    const {token , aboutTitle , aboutContent}= req.body;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            //let about = await aboutusModel.findOne({raw:true,where:{aboutTitle}});
            let about = await  aboutusModel.findOne({aboutTitle});

        if(about===null){
           // await aboutusModel.create({aboutTitle,aboutContent});
            await aboutusModel.insertMany({aboutTitle,aboutContent})
            res.json({message:'new about section created'});
        }
        else{
            res.json({message:"this title is used by another section"});
        }
            }
    })
})
aboutus.delete('/deleteabout/:id',async(req,res)=>{
    let aboutId = req.params.id
    const {token } = req.body;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            //let about = await aboutusModel.findOne({raw:true,where:{aboutId}});
            let about = await aboutusModel.findOne({_id:aboutId})
            if(about){
               // await aboutusModel.destroy({where:{aboutId}});
                await aboutusModel.deleteOne({_id:aboutId});
                let about = await aboutusModel.findOne({_id:aboutId});
                if(about===null){
                    res.json({message:"about Section deleted succesfully"});
                }
                else{
                    res.json({message:"about Section didn't delete "})
                }
            }
            else{
                res.json({message:"invalid Id"});
            }
        }
    })

    
})
module.exports=aboutus
