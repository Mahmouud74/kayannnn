const categories = require('express').Router();
const categoryModel = require('../models/categories.model');
const jwt=require('jsonwebtoken');
categories.post('/addCategory',async(req,res)=>{
    const {categoryName , token}=req.body
    jwt.verify(token , 'admin' , async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"})
        }
        else{
            let category = await categoryModel.findOne({categoryName});
            if(category === null){
                await categoryModel.insertMany({categoryName});
                category = await categoryModel.findOne({categoryName});
                if(category){
                    res.json({message:"categoryCreated" , category})
                }
                else{
                    res.json({message:'error in creation'})
                }
            }
            else{
                res.json({message:"category is created before"});
            }
        }
    })
})
categories.get('/categories',async(req,res)=>{
    let categories = await categoryModel.find({})
    if(categories[0]){
        res.json({categories})
    }
    else{
        res.json({message:'there is no categories'});
    }
})
categories.delete('/deleteCategory/:id',async(req,res)=>{
    let categoryId= req.params.id;
    const {token} = req.body;
    jwt.verify(token , 'admin',async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"})
        }
        else{
            let category = await categoryModel.findOne({_id:categoryId});
            if(category){
                await categoryModel.deleteOne({_id:categoryId});
                res.json({message:"category deleted succesfully"})
            }
            else{
                res.json({message:"Invalid Id"})
            }
        }
    })
})
categories.put('/editCategory/:id',async(req,res)=>{
    let categoryId=req.params.id;
    const {token,categoryName} = req.body
    jwt.verify(token , 'admin', async(err,decodded)=>{
        if(err){
            res.json({message:"error in token"})
        }
        else{
            let category = await categoryModel.findOne({categoryName});
            if(category){
                res.json({message:"enter another CategoryName"});
            }
            else{
                await categoryModel.updateMany({_id : categoryId},{$set:{categoryName:categoryName}})
                res.json({message:"category Updated"})
            }
        }
    })
})

module.exports = categories;