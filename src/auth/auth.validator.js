import Joi from "joi";

export default {
  googleSignin: Joi.object({
    id_token: Joi.string().required(),
  }).required(),

  auth: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),

  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }).required(),

  validateOtp: Joi.object({
    otp: Joi.string().required().min(6).max(6),
    email: Joi.string().required(),
  }).required(),

  resetPassword: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    reset_key: Joi.string().required(),
  }).required(),
};
