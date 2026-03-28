// (fn) => (req, res, next)  = (async function)
// ضمان سيرفر لن يتوقف عن عمل 
export const asyncHandler = (asyncFn) => {
  return (req, res, next) => {
    Promise.resolve(asyncFn(req, res, next)).catch(next);
  };
};
