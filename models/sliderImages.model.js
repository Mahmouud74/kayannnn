// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const sliderIamges = db.define('sliderImage',{
//     sliderImageId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     sliderImageUrl:{type:Sequelize.STRING(200) , unique:true, null:false},
// },{timestamps: false})
// module.exports=sliderIamges;
const mongoose = require('mongoose')
const sliderImageSchema = mongoose.Schema({
    sliderImageUrl:{type: String,required: true}
})
module.exports=mongoose.model('sliderImage',sliderImageSchema);
