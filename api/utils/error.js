export const errorHandler = (statusCode, message) => {
  //create a new error
  const error = new Error();
  // add the statuscode and message in the error object
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
