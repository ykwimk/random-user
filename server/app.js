const express = require('express');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('디비 연결 성공');
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.listen(3056, () => {
  console.log('server start!');
});
