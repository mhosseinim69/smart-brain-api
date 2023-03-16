const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.cjs');
const signin = require('./controllers/signin.cjs');
const profile = require('./controllers/profile.cjs');
const image = require('./controllers/image.cjs');

const db = knex({
    client: 'mysql',
    connection: {
      host : 'dpg-cg9gh99mbg54mbeu520g-a',
      port : 5432,
      user : 'mostafa',
      password : 'Zl9VqgO2xLrVdasAPpGOcX8FITq1xhAz',
      database : 'smartbrain_9ua8'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('success') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on Port ${process.env.Port}`)
})