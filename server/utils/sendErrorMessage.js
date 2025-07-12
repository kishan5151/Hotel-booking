/** @format */

const sendErrorResponse = (
  res,
  statusCode = 500,
  message = "Something went wrong"
) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default sendErrorResponse;
