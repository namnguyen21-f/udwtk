import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import logger from 'morgan';
import dotenv from 'dotenv';
const app = express();
import router from './src/routes/main.js'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/', router);

mongoose.Promise = global.Promise;
const db = mongoose.connection;

dotenv.config();
process.env.TOKEN_SECRET;

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