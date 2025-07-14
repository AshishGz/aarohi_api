import Boom from "@hapi/boom";
import moment from "moment";
import bcrypt from "bcrypt";

import { isEmpty, uuid } from "../../platforms/utils/common.js";
import knex from "../../platforms/utils/knex.js";
import { notify } from "../../platforms/utils/mailer.js";

/**
 * Forgot user password.
 *
 * @param   {Object}  payload
 * @param   {Object}  headers
 * @returns {Promise}
 */
export const forgotPassword = async (payload) => {
  try {
    const { email } = payload;
    const response = await knex("userInfo").select("id").where({ email });

    if (isEmpty(response)) {
      throw Boom.notFound("Email not found. Please try with another email.");
    }

    const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

    await knex("userInfo")
      .where({ email })
      .update({
        otp,
        otp_expiry: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"), // OTP valid for 10 minutes
      });

    const html = `<p>Dear User,</p>

<p>We received a request to reset your password.</p>

<p><strong>Your OTP is:</strong></p>
<h2 style="color: #2d89ef;">${otp}</h2>

<p>This OTP is valid for the next 10 minutes.</p>

<p>If you did not request a password reset, please ignore this email or contact our support team.</p>

<p>Best regards,<br/>
<strong>MoonGazer</strong><br/>
</p>`;

    const emailParams = {
      send_to: email,
      subject: "Reset Password",
      body: html,
    };

    await notify(emailParams);

    return {
      status: 200,
      success: true,
      message: "Otp has been sent to your email",
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Validate user OTP for password reset.
 *
 * @param   {Object}  payload
 * @param   {Object}  headers
 * @returns {Promise}
 */
export const validateOtp = async (payload) => {
  try {
    const { email, otp } = payload;
    const userInfo = await knex("userInfo").select("*").where({ email });

    if (isEmpty(userInfo))
      throw Boom.notFound("User not found. Please try with another email.");

    if (userInfo?.[0]?.otp !== otp)
      throw Boom.forbidden("Invalid OTP. Please try again.");

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const otpExpiry = moment(userInfo?.[0]?.otp_expiry).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    if (currentTime > otpExpiry)
      throw Boom.forbidden("OTP has expired. Please try again.");

    const resetKey = uuid();
    await knex("userInfo")
      .where({ email })
      .update({
        otp: null,
        otp_expiry: null,
        reset_key: resetKey,
        reset_key_expiry: moment()
          .add(10, "minutes")
          .format("YYYY-MM-DD HH:mm:ss"), // Reset key valid for 10 minutes
      });

    return {
      status: 200,
      success: true,
      reset_key: resetKey,
      message: "Otp validated successfully",
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Reset user password after OTP validation.
 *
 * @param   {Object}  payload
 * @param   {Object}  headers
 * @returns {Promise}
 */
export const resetPassword = async (payload) => {
  try {
    const { email, reset_key, password } = payload;
    const userInfo = await knex("userInfo").select("*").where({ email });

    if (isEmpty(userInfo))
      throw Boom.notFound("User not found. Please try with another email.");

    if (userInfo?.[0]?.reset_key !== reset_key)
      throw Boom.forbidden("Invalid resetting password. Please try again.");

    if (userInfo?.[0]?.reset_key_expiry) {
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
      const resetKeyExpiry = moment(userInfo?.[0]?.reset_key_expiry).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      if (currentTime > resetKeyExpiry)
        throw Boom.forbidden("Reset key has expired. Please try again.");
      
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await knex("userInfo").where({ email }).update({
      password: hashedPassword,
      reset_key: null,
      reset_key_expiry: null,
    });

    return {
      status: 200,
      success: true,
      message: "Password has been reset successfully",
    };
  } catch (err) {
    throw err;
  }
};
