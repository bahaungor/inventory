const { validationResult } = require('express-validator');

exports.validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body);
    // console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
