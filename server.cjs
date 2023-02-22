const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const  register = require('./controllers/register.cjs');
const  signin = require('./controllers/signin.cjs');
const  profile = require('./controllers/profile.cjs');
const  image = require('./controllers/image.cjs');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'smh1369',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('success') })
app.post('https://smart-brain-api-rvlc.onrender.com/signin', signin.handleSignin(db, bcrypt))
app.post('https://smart-brain-api-rvlc.onrender.com/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('https://smart-brain-api-rvlc.onrender.com/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('https://smart-brain-api-rvlc.onrender.com/image', (req, res) => { image.handleImage(req, res, db) })
app.post('https://smart-brain-api-rvlc.onrender.com/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on Port ${process.env.Port}`)
})