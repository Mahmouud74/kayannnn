const teaam = require('express');
const team = teaam();
const path = require('path');
const teamModel = require('../models/team.model');
const multer = require('multer');
const jwt = require('jsonwebtoken');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/teamImages')
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
 
  function fileFilter2 (req, file, cb) {
    let extension = file.mimetype;
    if(extension!="text/csv"&&extension!="application/pdf"&&extension!="application/msword"&&extension!="application/vnd.openxmlformats-officedocument.wordprocessingml.documentx"&&
      extension!="application/vnd.ms-powerpoint"&&extension!="application/vnd.openxmlformats-officedocument.presentationml.presentation"
      &&extension!="application/zip"&&extension!="application/vnd.ms-excel"&&extension!="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      &&extension!="text/plain"&&extension!="application/vnd.rar"){
        cb(null,false);
    }
    else{
        cb(null , true);
    }   
  }
  const teamImage = multer({dest:'uploads/teamImages',storage , fileFilter });
  const teamCv = multer({dest:'uploads/teamImages',storage , fileFilter:fileFilter2});
  team.put('/addcv/:id',teamCv.single("cv"),async(req,res)=>{
    let teamMemberId = req.params.id;
    const {token } = req.body;
    jwt.verify(token , 'admin' , async(err,decodded)=>{
      if (err){
          res.json({message:"error in token"});
      }
      else{
        let teamMember = await teamModel.findOne({_id:teamMemberId});
        if(teamMember){
          if(req.file==undefined){
            res.json({message:"unsupported file type"})
          }
          else{
           // await teamModel.update({cvUrl:`http://localhost:3000/${req.file.path}`},{where:{teamMemberId}});
            await teamModel.updateMany({_id:teamMemberId},{$set:{cvUrl:`http://localhost:3000/${req.file.path}`}});

            res.json({message:"cv Added Successfully"})
          }
        }
        else{
          res.json({message:"invalid Id"});
        }
      }
    })
  })
  team.post('/addteammember',teamImage.single("teamImage"),async(req,res)=>{
    const {teamMemberName , workPosition , job , linkedIn , faceBook , token } = req.body;
    jwt.verify(token , 'admin' , async(err,decodded)=>{
        if (err){
            res.json({message:"error in token"});
        }
        else {
            let teamMember = await teamModel.findOne({teamMemberName});
            if(teamMember === null){
                console.log("pathhh"+req.file.path);
                //  let pathh= req.file.path.replace('uploads/','');
                //let imageUrl="http://lmsapis.herokuapp.com/"+pathh;
                await teamModel.insertMany({ teamMemberName , workPosition , job , linkedIn , faceBook ,
                 imageUrl:`http://localhost:3000/${req.file.path}` });
                 let teaaam = await teamModel.findOne({teamMemberName});
                 res.json({message:"team Member added" , image : teaaam.imageUrl});
            }
        }
    })
  })
  team.get('/team',async(req,res)=>{
      const team = await teamModel.find({});
      if(team[0])
      {
      res.json({team});
      }
      else{
          res.json({message:"there is no team members"})
      }
  })
  team.delete('/deleteteammember/:id',async(req,res)=>{
    let teamMemberId = req.params.id;
    const {token} = req.body
    jwt.verify(token , 'admin' , async(err,decodded)=>{
      if (err){
          res.json({message:"error in token"});
      }
      else{
        let teamMember = await teamModel.findOne({_id:teamMemberId})
                if(teamMember){
                    await teamModel.deleteOne({_id:teamMemberId});
                   // partner=await partnersModel.findOne({raw:True , where:{partnerId}});
                        res.json({message:"teamMember deleted succesfully"})
                }
                else{
                    res.json({message:"invalid Id"})
                }
      }
    })
  })
module.exports=team;