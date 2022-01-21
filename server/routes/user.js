const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

// POST: /user/login
router.post('/login', async (req, res, next) => {
  try {
    console.log('asdf');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST: /user/
router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { userId: req.body.userId },
    });

    if (exUser) res.status(403).send('이미 사용 중인 아이디 입니다.');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      userId: req.body.userId,
      password: hashedPassword,
      nickName: req.body.nickName,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status(500)
  }
});

module.exports = router;
