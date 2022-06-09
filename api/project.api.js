const project = require('express').Router();
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
  const projectBackgroundImage = multer({dest:'uploads/projectImages',storage , fileFilter });
  project.post('/addproject',projectBackgroundImage.single('projectBackgroundImage') ,async(req,res)=>{
      const {title , year , location ,client ,categoryName, scope , token } = req.body;
      jwt.verify(token , 'admin' , async(err , decodded)=>{
          if(err){
              res.json({message:"error in token"})
          }
          else{
            let category = await categoriesModel.findOne({categoryName});
            let category_id = category._id;
            let project = await projectModel.findOne({title});
            console.log(project);
            if(project===null){
                await projectModel.insertMany({title , year , scope ,location ,client ,backgroundImage:`http://localhost:3000/${req.file.path}`
                ,category_id })
                project = await projectModel.findOne({title});
                res.json({message:"projectCreated" , project})
            }
            else{
                res.json({message:"this title is added before"})
            }
          }
      })
  } )
  project.get('/allprojects',async(req,res)=>{
      const projects = await projectModel.find({});
      if(projects[0]){
          res.json({projects});
      }
      else{
          res.json({message:"there is no projects"});
      }
  })
  project.get('/categoryprojects/:categoryName',async(req,res)=>{
      let categoryName= req.params.categoryName;
      const category = await categoriesModel.findOne({categoryName});
      if(category){
        const projects = await projectModel.find({category_id : category._id});
        if(projects[0]){
            res.json({projects})
        }
        else{
            res.json({message:`there is no projects in ${categoryName} Category`});
        }
      }
      else{
          res.json({message:"invalid Categroy name"})
      }
  })
  project.delete('/deleteproject/:id',async(req,res)=>{
    const {token} = req.body;
    const projectId = req.params.id;
    jwt.verify(token , 'admin',async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"});
        }
        else{
                await projectModel.deleteOne({_id:projectId});
               
                    res.json({message:"project deleted succesfully"})
            
        }
    })
  })

  module.exports = project