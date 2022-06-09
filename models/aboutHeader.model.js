// const Sequelize = require('sequelize');
// const db = require('./sequelize.model');
// const aboutHeader = db.define('aboutusHeader',{
//     aboutHeaderId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     aboutHeaderContent:{type:Sequelize.STRING(300) , unique:true, null:false},

// },{timestamps: false})
// module.exports=aboutHeader;
const mongoose = require('mongoose')
const aboutHeaderSchema = mongoose.Schema({
    aboutHeaderContent:{type: String,required: true},
})
module.exports=mongoose.model('aboutusHeader',aboutHeaderSchema);
