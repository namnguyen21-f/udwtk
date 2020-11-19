import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import router from './src/routes/main.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

mongoose.Promise = global.Promise;
const db = mongoose.connection;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/', router);
app.set("view engine", "ejs"); 
dotenv.config();


const port = 5035;

app.get('/', (request, respond) => {
  respond.status(200).json({
    message: 'Welcome to Project Support',
  });
});
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