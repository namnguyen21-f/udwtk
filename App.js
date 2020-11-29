import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import router from './src/routes/main.js'
import fetch from 'node-fetch'
import cloudinary from './src/ulti/cloudinary.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

mongoose.Promise = global.Promise;
const db = mongoose.connection;


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({limit:'1mb'}))
app.use('/api/', router);
app.set("view engine", "ejs"); 

dotenv.config();


app.get('/',async function(req, res) {
  var carousels = [];
  var items = [];
  var topviews  = [];
  await fetch('http://localhost:5035/api/getallfilm',{
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({limit: 6,categories : ["Action","Thriller"]}) 
  })
  .then(response => response.json())
  .then(data => {
    items = data.data;  
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  const topviewquery = ['Day','Month','Year'];

  for (let i=0;i <topviewquery.length; i++){
    await fetch('http://localhost:5035/api/gettopview',{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({limit: 4, rank: topviewquery[i]}) 
    })
    .then(response => response.json())
    .then(data => {
      var obj = {};
      obj.data = data.data;  
      obj.title = topviewquery[i];
      topviews.push(obj);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
 
  res.render('pages/homepage', {
    carousels : topviews[0].data,
    items: items,
    topviews: topviews,
  });
 
    
});

app.get('/login', function(req, res) {
  res.render('pages/loginpage', {

  });
});

app.get('/signup', function(req, res) {
  res.render('pages/signuppage', {

  });
});



app.get('/anime/:animeName',function(req,res){
  
  fetch(`http://localhost:5035/api/anime/${req.params.animeName}`)
  .then(response => response.json())
  .then(data => {
    res.render('pages/animedetail', {animeData : data.data});
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
})


app.listen(process.env.PORT || 3000, (request, respond) => {
  console.log(`Our server is live on $. Yay!`);
});


mongoose.connect( "mongodb+srv://Admin:1@cluster0.mpci4.mongodb.net/udwtk?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });