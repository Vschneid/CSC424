const express = require('express');
const router = express.Router();
const app = express();
//const cors = require("cors");
const port = 5000;

//app.use(cors());
app.use(express.json());

const users = [
    { username: 'van', password: '1234' },
];

const generateToken = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

app.post('/account/login', (req, res) => {
    console.log(req);
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    console.log(user);
    if (!user) {
      return res.status(401).send({ error: 'Incorrect username or password' });
    }

    //const token = generateToken(user);
    //console.log(token);
    const token = generateToken();
    res.send(token);
});

app.post('/account/logup', (req, res) => {
    console.log(req);
    const { username, password, valpassword } = req.body;
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
    
    if(hasUpper && hasDigit && hasSymbol) {
        users.push(username, password);
        const token = generateToken();
        res.send(token);
    } else {
        res.status(403).send("Password is not strong, include a capital letter, a number, and a special character.");
    }


});

//function generateToken(user) {
    //return `${user.userid}-${Date.now()}`;
//}


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  

module.exports = router;
 