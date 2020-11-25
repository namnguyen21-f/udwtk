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



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({limit:'1mb'}))
app.use('/api/', router);
app.set("view engine", "ejs"); 

dotenv.config();
const port = 5035;

app.get('/', function(req, res) {
  fetch(__dirname + '/api/getallfilm')
  .then(response => response.json())
  .then(data => {
    if (data) {
      console.log(data);
      res.render('pages/homepage', {
        items: data,
      });
    }
  });
    
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