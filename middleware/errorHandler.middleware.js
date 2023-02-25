const errorHandler = (err, req, res, next) => {
  if (err.name === 'NotFound') {
    return res.status(404).send({ message: err.message });
  }

  return res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
