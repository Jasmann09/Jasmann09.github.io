
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
const { response, query } = require('express');
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
fetch(ur, option)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err))
);
app.get('/menu', requireAuth, (req, res) => res.render('menu'));

app.get('/yoga', requireAuth, (req, res) => res.render('yoga'));


app.get('/bicepcurl', requireAuth, (req, res) => res.render('bicepcurl'));


app.get('/jumprope', requireAuth, (req, res) => res.render('jumprope'));

app.get('/squats', requireAuth, (req, res) => res.render('squats'));



app.get('/nut', requireAuth, (req, res) =>
res.render('nut'));




app.post('/n', requireAuth, (req, res) => {

const data=req.body;
console.log(data);
console.log(data.nut);
const params={
    query:data.nut,
}
const ur = `https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${encodeURIComponent(params.query)}`

const option = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '898dc87ffemsh431b3972083de6fp198dcfjsn9f46bab8a15a',
    'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
  }
};
console.log(params);

fetch(ur, option)
   .then(res => res.json())
   .then(json => {
    
    res.render('nn',{nn: json.items})})
   .catch(err => console.error('error:' + err))
 

});
    



