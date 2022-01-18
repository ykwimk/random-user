const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(3056, () => {
  console.log('server start!');
});
