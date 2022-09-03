const express = require('express');
const mongoose = require('mongoose');
const Diet= require('./diet');
const Non= require('./non');
const Data=require('./data');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User=require('./models/User')
const fetch=require("node-fetch");
const params={
    api_key:'4DJ2dhn8pujJC3k1IBkdeNhvzvMFNnEEtOcRKKi',
    query:'apple',
    dataType:["Branded"],
    pageSize:1,
}
const api_url=`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIcomponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIcomponent(params.dataType)}&pageSize=${encodeURIComponent(params.pageSize)}`




const app=express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true}));



const dburi='mongodb+srv://asmann:aj26@cluster0.0hpvr.mongodb.net/prac?retryWrites=true&w=majority'
mongoose.connect(dburi)
.then((result) => app.listen(5000))
.catch((err) => console.log(err))


const cookieParser = require('cookie-parser');
const { json } = require('body-parser');
const { response } = require('express');
app.use(cookieParser());
app.get('*', checkUser);
app.use(authRoutes);

app.post('/add',(req,res)=>{
    const data=new Data(req.body);
    data.save()
    .then((result)=>{
        const stat=result
        if (stat.vn=='veg')
        {
            Diet.find()
            .then((result)=>{
                res.render('veg',{diets: result })
            })
            .catch((err)=>{
                console.log(err);
            }) ;
        }
        else if(stat.vn=='non veg')
        {
            Non.find()
            .then((result)=>{
                res.render('non',{nons: result })
            })
            .catch((err)=>{
                console.log(err);
            }) ;
        }

    })
    .catch((err)=>{
        console.log(err);
    }) ;

})

app.get('/add-blo', requireAuth, (req, res) => res.render('form'));
app.get('/home',async(req,res)=>{
    const dd =res.locals.user
    console.log(dd.email);
    Data.find({email:dd.email})
    .then((result)=>{
        console.log(result);
        const k = result;
        res.render('home',{datas :result})
    })
    .catch((err)=>{
            console.log(err);
        });

    

})
app.get('/a', requireAuth, (req, res) => 
fetch(api_url).then(response => response.json())
.then(data => console.log(data.foods[0].foodNutrients))
);
    


