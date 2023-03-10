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
    client: 'pg',
    connection: {
      host : "postgres://smart_brain_mysql_user:iybxrQA9IofWF3tnQAe8PKsftsURILKg@dpg-cfr1ra1mbjsgn6tgd1ng-a/smart_brain_mysql",
      port : 5432,
      user : 'smart_brain_mysql_user',
      password : 'iybxrQA9IofWF3tnQAe8PKsftsURILKg',
      database : 'smart_brain_mysql'
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