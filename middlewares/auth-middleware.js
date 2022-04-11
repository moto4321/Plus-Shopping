const jwt = require('jsonwebtoken');
// const User = require('../models_mongo/user')
const { User } = require('../models');

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // 프론트에서 대문자로 보내도 여기선 소문자로 들어옴
  const [tokenType, tokenValue] = authorization.split(' ')

  if (tokenType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인 후 사용하세요',
    });
    return;
  }

  try {
    const { userId } = jwt.verify(tokenValue, "my-secret-key");

    // User.findById(userId).exec().then((user) => {
    //   res.locals.user = user;
    //   next();
    // });

    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send({
      errorMessage: '로그인 후 상요하세요',
    });
    return;
  }
}