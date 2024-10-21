// promisified versiion of below code
const asyncHandler = (requestFn) => {
  return (req, res, next) => {
    Promise.resolve(requestFn(req, res, next)).catch((err) => next(err));
  };
};

module.exports = {
  asyncHandler,
};

