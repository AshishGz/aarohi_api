import jwt from "jsonwebtoken";
import moment from "moment";

/**
 * Generate token
 *
 * @param {Object} payload
 * @param {Number} expires in minutes
 * @param {String} [secret]
 * @returns {String}
 */
export const generateToken = (
  payload,
  expires = 1,
  secret = process.env.JWT_KEY
) => {
  const options = {
    sub: payload.email,
    iat: moment().unix(),
    exp: moment().add(expires, "days").unix(),
  };
  const signOptions = { ...options, ...payload };
  return jwt.sign(signOptions, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 *
 * @param {String} token
 */
export const verifyToken = (token, res) => {
  if (!token) {
    res.status(403).json({ status: 403, success: false, message: "No token provided." });
  }
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ status: 401, success: false, message: "Token has expired." });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ status: 400, success: false, message: "You are not authorized to perform this operation." });
    }
    throw err;
  }
};
