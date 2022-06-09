// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const client = db.define('client',{
//     clientId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     clientName:{type:Sequelize.STRING(50) , unique:true, null:false},
//     clientPhone:{type:Sequelize.STRING(150), null:false },
//     clientMail : {type:Sequelize.STRING(20), null:false},
//     clientMessage : {type:Sequelize.STRING(300), null:false},
// },{timestamps: false})
// module.exports=client;
const mongoose = require('mongoose')
const clientSchema = mongoose.Schema({
    clientName:{type: String,required: true},
    clientMail:{type: String,required: true},
    clientMessage:{type: String,required: true},
    clientPhone:{type:String},
})
module.exports=mongoose.model('client',clientSchema);
