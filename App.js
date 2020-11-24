import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import router from './src/routes/main.js'
import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

mongoose.Promise = global.Promise;
const db = mongoose.connection;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({limit:'1mb'}))
app.use('/api/', router);
app.set("view engine", "ejs"); 

dotenv.config();
const port = 5035;

app.get('/', function(req, res) {
    var items=[];
    fetch('http://localhost:5035/api/getimage',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({imageid : "5fb37ae6385f501e1c4136fc"})
    }).then(res => res.json())
    .then(data =>{
      console.log(data.image.image.data);
      items.push(data.image);
    }).then(() => {
      res.render('pages/homepage', {
        items: items,
      });
    }) 
});

app.get('/login', function(req, res) {
  res.render('pages/loginpage', {
  });
});



app.get('/register', function (req, res, next) {
  res.render('pages/registerpage', {});
  
})


app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});


mongoose.connect( "mongodb+srv://Admin:1@cluster0.mpci4.mongodb.net/udwtk?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });