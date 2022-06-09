// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const user = db.define('user',{
//     userId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     userName:{type:Sequelize.STRING(50) , unique:true, null:false},
//     password:{type:Sequelize.STRING(150), null:false },
//     phone : {type:Sequelize.STRING(20), null:false},
// },{timestamps: false})
// module.exports=user;
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    userName:{type: String,required: true},
    password:{type: String,required: true},
    phone:{type:String},
})
module.exports=mongoose.model('user',userSchema);
