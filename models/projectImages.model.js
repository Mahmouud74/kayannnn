// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const projectModel = require('./project.model')
// const projectImages = db.define('projectImage',{
//     imageId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     image:{type:Sequelize.STRING(200) , null:false},
   
// },{timestamps: false})
// projectImages.belongsTo(projectModel , {foreignKey: 'project_id', targetKey: 'projectId'});
// module.exports=projectImages;
const mongoose = require('mongoose')
const projectImageSchema = mongoose.Schema({
   
    image:{type: String,required: true},
    project_id : {type : mongoose.Schema.Types.ObjectId , ref : 'project'}

})
module.exports=mongoose.model('projectImage',projectImageSchema);
