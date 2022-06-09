const partners= require('express').Router();
const path = require('path');
const partnersModel = require('../models/partner.model');
const multer = require('multer');
const jwt = require('jsonwebtoken');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/partnersImages')
    },
    filename: function (req, file, cb) {
        x=file.originalname.replace(/\s+/g, '');
      cb(null, Date.now()+x  )
    }
  })    
  function fileFilter (req, file, cb) {
    let extension = file.mimetype;
    if(extension!="image/png"&&extension!="image/jpg"&&extension!="image/jpeg"&&extension!="image/webp"){
        cb(null,false);
    }
    else{
        cb(null , true);
    }   
  }
    const partnersImage = multer({dest:'uploads/partnersImages',storage , fileFilter });
    partners.post('/addpartner',partnersImage.single('partnersImage'),async(req,res)=>{
        const{token}=req.body;
        jwt.verify(token , 'admin' , async (err,decodded)=>{
            if(err){
                res.json({message:"error in token"})
            }
            else{

                await partnersModel.insertMany({partnerImageUrl:`https://kayann.herokuapp.com/${req.file.path}`});
                res.json({message:'added succesfully'});

            }
        })
    })
    partners.get('/partners',async(req,res)=>{
        let partners = await partnersModel.find({});
        if(partners[0]){
            res.json({partners});
        }
        else {
            res.json({message:"there is no partnersImages"});
        }
    })
    partners.delete('/deletepartner/:id',async(req,res)=>{
        let partnerId = req.params.id;
        const {token} = req.body;
        jwt.verify(token , 'admin',async(err,decodded)=>{
            if(err){
                res.json({message:"error in token"});
            }
            else{
                let partner = await partnersModel.findOne({_id:partnerId})
                if(partner){
                    await partnersModel.deleteOne({_id:partnerId});
                   // partner=await partnersModel.findOne({raw:True , where:{partnerId}});
                        res.json({message:"partner deleted succesfully"})
                }
                else{
                    res.json({message:"invalid Id"})
                }
            }
        })
    })


module.exports=partners;
