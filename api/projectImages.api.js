const projectImages = require('express').Router();
const path = require('path');
const projectModel = require('../models/project.model');
const projectImagesModel = require('../models/projectImages.model');
const categoriesModel = require('../models/categories.model')
const multer = require('multer');
const jwt = require('jsonwebtoken');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/projectImages')
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
  const projectImage = multer({dest:'uploads/projectImages',storage , fileFilter });
  projectImages.get('/projectImages/:id',async(req,res)=>{
      const projectId = req.params.id;
      let project = await projectModel.findOne({_id:projectId});
      if(project){
          let projectImages = await projectImagesModel.find({project_id : projectId});
          if(projectImages[0]){
              res.json({project , projectImages });
          }
          else{
              res.json({message:"there is no images for this project" , project})
          }
      }
      else{
          res.json({message:"thire is no images for this project"})
      }
  })
  projectImages.post('/addprojectImage/:id', projectImage.any('projectImages'),async(req,res)=>{
      let projectId = req.params.id  
      const {token } = req.body ; 
      jwt.verify(token , 'admin',async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"});
        }
        else{
      let project = await projectModel.findOne({_id:projectId });
      console.log(project);
      if(project){
        for (let i = 0; i < req.files.length; i++) {
            await projectImagesModel.insertMany({project_id : projectId , image:`https://kayann.herokuapp.com/${req.file.path}`})            
        }
        let projectImages = await projectImagesModel.find({project_id : project._id})
        res.json({message:"images Added Successfully" , projectImages})
      }
      else{
          res.json({message:" invalid Id"})
      }
        }
    })
  })
  projectImages.delete('/deleteimages/:id',async(req,res)=>{
      let project_id=req.params.id;
      const {token} = req.body;
      jwt.verify(token , 'admin',async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"});
        }
        else{
            let images = await projectImagesModel.find({project_id});
            if(images[0]){
                await projectImagesModel.deleteMany({project_id});
                res.json({message:"Images deleted succesfully"})
            }
        }
    })
  })

module.exports=projectImages
