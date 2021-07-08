const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');
const FriendModel = require('./models/Friends');

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect(
  'mongodb://localhost:27017/MERN?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.post('/addfriend', async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const friend = new FriendModel({
    name: name,
    age: age,
  });
  await friend.save();
  res.send('Success');
});

app.get('/read', async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log(chalk.magenta.bold('You are connected on port 3001'));
});
