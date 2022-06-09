// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const whyKayanModel = require('./whyKayan.model');
// const whyKayanContents = db.define('whykayancontent',{
//     whyKayanContentsId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     whyKayanContent:{type:Sequelize.STRING(700) , null:false},
// },{timestamps: false})
// whyKayanContents.belongsTo(whyKayanModel , {foreignKey: 'whyKayan_id', targetKey: 'whyKayanId'});
// module.exports=whyKayanContents;
const mongoose = require('mongoose')
const whyKayanContentSchema = mongoose.Schema({
    whyKayanContent:{type: String,required: true},
    whyKayan_id : {type : mongoose.Schema.Types.ObjectId , ref : 'whyKayan'}
})
module.exports=mongoose.model('whykayancontent',whyKayanContentSchema);
