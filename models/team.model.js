// const Sequelize = require('sequelize');
// const db = require('../models/sequelize.model');
// const team = db.define('teammember',{
//     teamMemberId:{type:Sequelize.INTEGER, primaryKey:true , autoIncrement:true , null:false},
//     teamMemberName:{type:Sequelize.STRING(100) , null:false},
//     workPosition:{type:Sequelize.STRING(100) , null:false},
//     job:{type:Sequelize.STRING(100) , null:false},
//     faceBook:{type:Sequelize.STRING(200),null:true },
//     linkedIn:{type:Sequelize.STRING(200),null:true},
//     imageUrl :{type:Sequelize.STRING(200),null:false},
//     cvUrl:{type:Sequelize.STRING(200),null:true}
// },{timestamps: false})
// module.exports=team;
const mongoose = require('mongoose')
const teamSchema = mongoose.Schema({
    teamMemberName:{type: String,required: true},
    workPosition:{type: String,required: true},
    job:{type:String},
    linkedIn:{type: String,required: true},
    faceBook:{type: String,required: true},
    imageUrl:{type:String},
    cvUrl:{type:String},
})
module.exports=mongoose.model('teammember',teamSchema);
