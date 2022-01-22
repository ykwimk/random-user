const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');
const router = express.Router();

// POST: /user/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
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
