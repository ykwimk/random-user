const express = require('express');
const db = require('./models');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('디비 연결 성공');
  })
  .catch(console.error);

app.post('/login', (req, res) => {
  res.send('hello express');
});

app.listen(3056, () => {
  console.log('server start!');
});
