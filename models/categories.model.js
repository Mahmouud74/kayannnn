// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const category = db.define('categorie',{
//     categoryId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     categoryName:{type:Sequelize.STRING(100) , unique:true, null:false},
// },{timestamps: false})
// module.exports=category;
const mongoose = require('mongoose')
const categoriesSchema = mongoose.Schema({
    categoryName:{type: String,required: true},
})
module.exports=mongoose.model('categorie',categoriesSchema);
