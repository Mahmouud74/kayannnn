// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const categoryModel = require('./categories.model')
// const project = db.define('project',{
//     projectId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     title:{type:Sequelize.STRING(100) , null:false},
//     year :{type:Sequelize.DATE },
//     location :{type:Sequelize.STRING(100)},
//     backgroundImage:{type:Sequelize.STRING(200)},
//     client:{type:Sequelize.STRING(100)},
//     scope:{type:Sequelize.STRING(100)}

// },{timestamps: false})
// project.belongsTo(categoryModel , {foreignKey: 'category_id', targetKey: 'categoryId'});
// module.exports=project;
const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    title:{type: String,required: true},
    year:{type: String,required: true},
    location:{type:String},
    backgroundImage:{type: String,required: true},
    client:{type: String,required: true},
    scope:{type:String},
    category_id : {type : mongoose.Schema.Types.ObjectId , ref : 'categorie'}

})
module.exports=mongoose.model('project',projectSchema);
