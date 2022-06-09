// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const service = db.define('service',{
//     serviceId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     serviceTitle:{type:Sequelize.STRING(100) , unique:true, null:false},
//     serviceContent:{type:Sequelize.STRING(300) , null:false},

// },{timestamps: false})
// module.exports=service;
const mongoose = require('mongoose')
const servicesSchema = mongoose.Schema({
    serviceTitle:{type: String,required: true},
    serviceContent:{type: String,required: true},

})
module.exports=mongoose.model('service',servicesSchema);
