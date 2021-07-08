const express = require('express');
const app = express();
const mongoose = require('mongoose');
const chalk = require('chalk');
const FriendModel = require('./models/Friends');

// DATABASE CONNECTION
mongoose.connect(
  'mongodb://localhost:27017/MERN?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

app.get('/insert', async (req, res) => {
  const friend = new FriendModel({
    name: 'John',
    age: 98,
  });
  await friend.save();
  res.send('Inserted DATA');
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
