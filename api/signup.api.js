const signup = require('express').Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const db = require('../models/sequelize.model');
const userModel = require('../models/user.model');
const {check , validationResult} = require('express-validator');
signup.post('/signup',
check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
check('phone').matches(/^(01)[0512][0-9]{8}$/)
,async(req,res)=>{
    const { userName , password , phone }=req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        let user = await userModel.findOne({userName});
        if(user===null){
            user = await userModel.findOne({phone});
            if(user===null){
                    bcrypt.hash(password,7,async(err,hash)=>{
                    await userModel.insertMany({userName , password:hash , phone})
                    user= await userModel.findOne({userName})
                    res.json({message:"user Created", user});
                    let match = await bcrypt.compare(password,hash);
                    console.log(match);
                })
            }
            else{
                res.json({message:"this phonenumber is used by another user"})
            }
        }
        else{
            res.json({message:"this username is used by anothe user"})
        }
    }
    else
    {
        res.json({errors:errors.array() , message:errors.array().param});
    }
})

module.exports=signup