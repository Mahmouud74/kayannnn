const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;
const db= require('./models/sequelize.model');
const path = require('path')
const userModel = require('./models/user.model');
const serviceModel = require('./models/service.model');
const service = require('./models/service.model');
const signin = require('./api/signin.api');
const signup= require('./api/signup.api');
const aboutus=require('./api/aboutus.api');
const services = require('./api/services.api');
const whyKayan = require('./api/whykayan.api')
const contactsMethods = require('./api/contactMethods.api');
const team = require('./api/team.api');
const partners = require('./api/partners.api');
const projects = require('./api/project.api');
const categories = require('./api/categories.api');
const projectImages = require('./api/projectImages.api');
const sliderImages = require('./api/sliderImages.api');
const client = require('./api/client.api');
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cors())
app.use(express.json());
//connect the db
/*async function database (){
    await db.authenticate(()=>{
        console.log("conn");
    });
}*/
//
//calling the apis
app.use(signin);
app.use(signup);
app.use(aboutus);
app.use(services);
app.use(whyKayan);
app.use(contactsMethods);
app.use(team);
app.use(partners);
app.use(projects);
app.use(categories);
app.use(projectImages);
app.use(sliderImages);
app.use(client);
//
//run the server
app.get('/',async (req,res)=>{
    //const user = await userModel.findOne({raw:true})
    //await serviceModel.create({serviceTitle,serviceContent})
    res.json({message:"hello"});
})
//database();
mongoose.connect('mongodb+srv://admin:admin@cluster0.vk4zz.mongodb.net/kayanDB', { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(process.env.PORT || port,()=>{
    console.log('Bsm Allah');
})