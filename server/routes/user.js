const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');
const router = express.Router();

const { isLogin, isNotLogin } = require('./middlewares');

// GET /user
router.get('/', isLogin, async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST: /user/login
router.post('/login', isNotLogin, async (req, res, next) => {
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
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// POST: /user/
router.post('/sign-up', isNotLogin, async (req, res, next) => {
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
    res.status(201).send('회원가입을 성공하였습니다.');
  } catch (error) {
    console.error(error);
    next(error); // status(500)
  }
});

// POST: /user/
router.post('/logout', isLogin, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('로그아웃이 완료되었습니다.');
});

module.exports = router;
