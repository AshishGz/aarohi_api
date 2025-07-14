import * as signInUseCase from "./usecases/signin.js";
import * as signUpUseCase from "./usecases/signup.js";
import * as resetPasswordUseCase from "./usecases/resetPassword.js";
/**
 * Sign in user with google.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const googleSignin = (req, res, next) => {
  signInUseCase
    .googleSignin(req.body, res)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Sign in user with apple id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const appleSignin = (req, res, next) => {
  signInUseCase
    .appleSignin(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Sign up a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const signUp = (req, res, next) => {
  signUpUseCase
    .signUp(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Login user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const login = (req, res, next) => {
  signInUseCase
    .login(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Forgot user password.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const forgotPassword = (req, res, next) => {
  resetPasswordUseCase
    .forgotPassword(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Validate user OTP for password reset.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const validateOtp = (req, res, next) => {
  resetPasswordUseCase
    .validateOtp(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Reset user password after OTP validation.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const resetPassword = (req, res, next) => {
  resetPasswordUseCase
    .resetPassword(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};