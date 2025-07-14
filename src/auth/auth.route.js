import express from "express";

import * as authCtrl from "./auth.controller.js";
import validate from "../platforms/config/joi.validate.js";
import authValidator from "./auth.validator.js";

const router = express.Router();

router
  .route("/signup")
  .post(validate(authValidator.auth, "body"), authCtrl.signUp);

router
  .route("/login")
  .post(validate(authValidator.auth, "body"), authCtrl.login);

router
  .route("/forgot-password")
  .post(
    validate(authValidator.forgotPassword, "body"),
    authCtrl.forgotPassword
  );

router
  .route("/validate-otp")
  .post(validate(authValidator.validateOtp, "body"), authCtrl.validateOtp);

router
  .route("/reset-password")
  .post(validate(authValidator.resetPassword, "body"), authCtrl.resetPassword);

router
  .route("/google/signin")
  .post(validate(authValidator.googleSignin, "body"), authCtrl.googleSignin);

router
  .route("/apple/signin")
  .post(validate(authValidator.googleSignin, "body"), authCtrl.appleSignin);

export default router;
