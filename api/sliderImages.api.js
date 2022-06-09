const sliderImagess= require('express').Router();
const path = require('path');
const sliderImagesModel = require('../models/sliderImages.model');
const multer = require('multer');
const jwt = require('jsonwebtoken');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/sliderImages')
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
    const sliderImage = multer({dest:'uploads/sliderImages',storage , fileFilter });
    sliderImagess.post('/addsliderImage',sliderImage.single('sliderImage'),async(req,res)=>{
        const{token}=req.body;
        jwt.verify(token , 'admin' , async (err,decodded)=>{
            if(err){
                res.json({message:"error in token"})
            }
            else{

                await sliderImagesModel.insertMany({sliderImageUrl:`https://kayann.herokuapp.com/${req.file.path}`});
                res.json({message:'added succesfully'});

            }
        })
    })
    sliderImagess.get('/sliderimages',async(req,res)=>{
        let sliderImages = await sliderImagesModel.find({});
        if(sliderImages[0]){
            res.json({sliderImages});
        }
        else{
            res.json({message:"there is no Slider Images"});
        }
    })
    sliderImagess.delete('/deletesliderimage/:id',async(req,res)=>{
        let sliderImageId = req.params.id;
        const {token} = req.body;
        jwt.verify(token , 'admin',async(err,decodded)=>{
            if(err){
                res.json({message:"error in token"});
            }
            else{
                let sliderImages = await sliderImagesModel.findOne({_id:sliderImageId})
                if(sliderImages){
                    await sliderImagesModel.deleteOne({_id:sliderImageId});
                   // partner=await partnersModel.findOne({raw:True , where:{partnerId}});
                        res.json({message:"sliderImage deleted succesfully"})
                }
                else{
                    res.json({message:"invalid Id"})
                }
            }
        })
    })


module.exports=sliderImagess;
