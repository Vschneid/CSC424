const express = require('express');
const router = express.Router();
const userServices = require('./models/user-services');
const app = express();
const cors = require("cors");
const port = 5000;
const https = require("https");
const fs = require("fs");

app.use(cors());
app.use(express.json());

https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    app
  )
  .listen(5000, () => {
    console.log("server is runing at port 5000");
  });

const dotenv = require('dotenv');

dotenv.config();

process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

app.post('/account/login', async (req, res) => {
    console.log(req);
    const { username, password } = req.body;

    const user = await userServices.findUser(username, password);
    console.log(user);
    if (!user) {
      return res.status(401).send({ error: 'Incorrect username or password' });
    }
    const token = generateAccessToken({ username: req.body.username });
    res.send(token);
});

app.post('/account/logup', async (req, res) => {
    console.log(req);
    const {name, username, password, valpassword, email } = req.body;
    if(password != valpassword) {
      res.status(403).send("Error during password validation.");
    }

    let hasUpper = false;
    let hasDigit = false;
    let hasSymbol = false;
  
    for (let i = 0; i < password.length; i++) {
      const char = password.charAt(i);
      if (/[A-Z]/.test(char)) {
        hasUpper = true;
      } else if (/\d/.test(char)) {
        hasDigit = true;
      } else if (/[\W_]/.test(char)) {
        hasSymbol = true;
      }
    }

    const exists = await userServices.checkUser(username);

    if(exists == true) {
      console.log("HHHHHHHHHH")
      res.status(403).end();
    } else {
      if(hasUpper && hasDigit && hasSymbol) {
        const userAdded = await userServices.addUser({ name, username, password, email });
        console.log("hello");
        if (userAdded)
          res.status(201);
        else
          res.status(500).end();
        const token = generateAccessToken({ username: req.body.username });
        res.send(token);
      } else {
        console.log("why");
        res.status(403).send("Password is not strong, include a capital letter, a number, and a special character.");
      }
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/directory', async (req,res) =>{
  var everyone = await userServices.getAll();
  var dir = everyone.map(user => {
      return {name: user.name, email: user.email}
  })
  return res.status(200).send(dir);
})

app.get('/users', async (req, res) => {
  const username = req.query['username'];
  try {
      const result = await userServices.getUsers(username);
      res.send({users_list: result});         
  } catch (error) {
      console.log(error);
      res.status(500).send('An error ocurred in the server.');
  }
});

module.exports = router;
 