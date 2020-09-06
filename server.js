const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs')
const app = express();

const register = require('./containers/register')
const signin = require('./containers/signin')
const profile = require('./containers/profile')
const image = require('./containers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'nagra123',
      database : '\'smart-brain\''
    }
  });


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => { res.json("Its working fine") })
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT||3001, () => {
    console.log(`app is running on ${process.env.PORT}`)
});
