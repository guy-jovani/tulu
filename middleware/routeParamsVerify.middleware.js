const { validationResult } = require('express-validator');

const handleValidationRoutesErrors = (req) => {
  const reqErrors = validationResult(req);
  if (reqErrors.isEmpty()) return { messages: [] };

  let messages = reqErrors.errors.reduce((prevMsgs, curr) => {
    if (!prevMsgs.includes(curr['msg'])) {
      prevMsgs.push(curr['msg']);
    }
    return prevMsgs;
  }, []);
  return { messages };
};

const routeVerify = async (req, res, next) => {
  const routeErrors = handleValidationRoutesErrors(req);
  if (routeErrors.messages.length) {
    return res.status(400).send(routeErrors.messages);
  }
  next();
};

module.exports = routeVerify;
