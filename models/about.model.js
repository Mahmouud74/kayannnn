// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const about = db.define('aboutu',{
//     aboutId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     aboutTitle:{type:Sequelize.STRING(100) , unique:true, null:false},
//     aboutContent:{type:Sequelize.STRING(300) , null:false},

// },{timestamps: false})
// module.exports=about;
const mongoose = require('mongoose')
const aboutSchema = mongoose.Schema({
    aboutTitle:{type: String,required: true},
    aboutContent:{type: String,required: true},
})
module.exports=mongoose.model('aboutu',aboutSchema);
