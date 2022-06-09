const whyKayan = require('express').Router();
const whyKayanModel=require('../models/whyKayan.model');
const whyKayanContentModel = require('../models/whyKayanContent.model')
const jwt = require('jsonwebtoken');
whyKayan.get('/whykayancontent',async(req,res)=>{
    let whyKayandata = await whyKayanModel.find({});
    let result=[];
    if(whyKayandata[0]){
        for (let i = 0; i < whyKayandata.length; i++) {
            let whyKayanContent = await whyKayanContentModel.find(
                {whyKayan_id:whyKayandata[i]._id} 
                );
                let temp = {whyKayanId:whyKayandata[i]._id,whyKayanTitle : whyKayandata[i].whyKayanTitle , whyKayanContent};
                result.push(temp)
        }
        if(result[0]){
            
            res.json({result})
        }
    }
    else{
        res.json({message:"there is no whyKayan section"})
    }
})

whyKayan.post('/addwhykayantitle',async(req,res)=>{
    const {whyKayanTitle,token} = req.body;
    jwt.verify(token , 'admin' , async(err , decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            let whyKayan = await whyKayanModel.findOne({whyKayanTitle});
            if(whyKayan){
                res.json("this title inserted before");
            }
            else{
                await whyKayanModel.insertMany({whyKayanTitle});
                res.json({message:"why Kayan title Added succesfully"})
            }
            }
    })
})
whyKayan.post('/addwhykayancontent/:id',async(req,res)=>{
    let whyKayan_id = req.params.id;
    const {token , whyKayanContent} = req.body;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
           let whyKayanTitle = await whyKayanModel.findOne({_id:whyKayan_id});
           if(whyKayanTitle){
            await whyKayanContentModel.insertMany({whyKayan_id:whyKayanTitle._id , whyKayanContent})
            res.json({message:"content Added succefully"})
           }
           else{
               res.json({message:"Invalid Id"})
           }
        }
    })
})
whyKayan.delete('/deletewhykayancontent/:id',async(req,res)=>{
    let whyKayanId = req.params.id;
    const {token} = req.body;
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
            let whyKayan = await whyKayanModel.findOne({_id:whyKayanId});
            console.log(whyKayan);
            if(whyKayan){
                let whyKayanContent = await whyKayanContentModel.find({whyKayan_id:whyKayanId})
                if(whyKayanContent[0]){
                    await whyKayanContentModel.deleteMany({whyKayan_id:whyKayanId})
                }
                await whyKayanModel.deleteOne({_id:whyKayanId});
                whyKayan = await whyKayanModel.findOne({_id:whyKayanId} )
                if(whyKayan===null){
                    res.json({message:"whyKayanSection deleted succesfully"})
                }
                else{
                    res.json({message:"error in deletion"})
                }
            }
            else{
                res.json({message:'invalid Id'});
            }
        }
    })

})
whyKayan.delete('/deletewhykayanitem/:id',async(req,res)=>{
    let whyKayanContentsId = req.params.id;
    const {token} = req.body
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
          let whyKayanContent = await whyKayanContentModel.findOne({_id:whyKayanContentsId});
          if(whyKayanContent){
            await whyKayanContentModel.deleteOne({_id:whyKayanContentsId});
            res.json({message:"delete Succedfully"});
          }
          else{
              res.json({message:"invalid Id"})
          }
        }
    })
})
whyKayan.put('/editwhykayanitem/:id',async(req,res)=>{
    let whyKayanContentsId = req.params.id;
    const {token , whyKayanContent} = req.body
    jwt.verify(token ,"admin" ,async (err, decodded)=>{
        if(err){
            res.json({message:"there is error in token"});
        }
        else{
          let whyKayanContentItem = await whyKayanContentModel.findOne({_id:whyKayanContentsId});
          if(whyKayanContentItem){
            //await whyKayanContentModel.update({whyKayanContent},{where:{whyKayanContentsId}});
            await whyKayanContentModel.updateMany({_id:whyKayanContentsId},{$set:{whyKayanContent}});

            res.json({message:"updated Succedfully"});
          }
          else{
              res.json({message:"invalid Id"})
          }
        }
    })
})
module.exports=whyKayan;