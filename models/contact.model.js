// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const contact = db.define('contactu',{
//     contactId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     contactPhone:{type:Sequelize.STRING(20) , unique:true, null:false},
//     contactMobile:{type:Sequelize.STRING(20) , unique:true, null:false},
//     contactFax:{type:Sequelize.STRING(20) , unique:true,null:false},
//     contactMail:{type:Sequelize.STRING(50) ,unique:true , null:false}
// },{timestamps: false})
// module.exports=contact;
const mongoose = require('mongoose')
const contactSchema = mongoose.Schema({
    contactMobile:{type: String,required: true},
    contactFax:{type: String,required: true},
    contactPhone:{type:String},
    contactMail:{type:String}
})
module.exports=mongoose.model('contactu',contactSchema);
