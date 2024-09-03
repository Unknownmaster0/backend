// promisified versiion of below code
const asyncHandler = (requestFn) => {
  return (req, res, next) => {
    Promise.resolve(requestFn(req, res, next)).catch((err) => next(err));
  };
};

module.exports = {
  asyncHandler,
};

// const asyncHandler = (requestFn) => {
//   async (req, res, next) => {
//     try {
//       return await requestFn(req, res, next);
//     } catch (err) {
//       res.status(err.code || 404).json({
//         success: false,
//         msg: err.message,
//       });
//     }
//   };
// };

// const a = (fn) => {() => {} }; // running the parametric fn inside arrow fn.
