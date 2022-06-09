// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const partners = db.define('partner',{
//     partnerId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     partnerImageUrl:{type:Sequelize.STRING(200) , unique:true, null:false},
// },{timestamps: false})
// module.exports=partners;
const mongoose = require('mongoose')
const partnerSchema = mongoose.Schema({
    partnerImageUrl:{type: String,required: true},
   
})
module.exports=mongoose.model('partner',partnerSchema);
