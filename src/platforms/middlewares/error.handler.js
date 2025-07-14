export const genericErrorHandler = (err, req, res, next) => {
  console.log("🚀 ~ genericErrorHandler ~ err:", err);
  if (err.isJoi) {
    const joiErr = {
      code: 400,
      success: false,
      message: "Bad Request",
      details:
        err.details &&
        err.details.map((joiError) => {
          return {
            message: joiError.message,
            param: joiError.path.join("."),
          };
        }),
    };
    return res.status(joiErr.code).json(joiErr);
  }
  if (err.isBoom) {
    const boomErr = err.output.payload;
    return res.status(boomErr.statusCode).json({
      code: boomErr.statusCode,
      success: false,
      message: boomErr.message,
    });
  } else {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
