// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const whyKayan = db.define('whyKayan',{
//     whyKayanId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     whyKayanTitle:{type:Sequelize.STRING(100) , unique:true, null:false},
// },{timestamps: false})
// module.exports=whyKayan;
const mongoose = require('mongoose')
const whyKayanSchema = mongoose.Schema({
    whyKayanTitle:{type: String,required: true},
})
module.exports=mongoose.model('whyKayan',whyKayanSchema);
