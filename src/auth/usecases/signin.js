import bcrypt from "bcrypt";
import _ from "lodash";
import axios from "axios";
import Boom from "@hapi/boom";

import { generateToken } from "../../platforms/utils/token.js";
import knex from "../../platforms/utils/knex.js";
import { isEmpty } from "../../platforms/utils/common.js";
import moment from "moment";
import userModel from "../../user/user.model.js";

/**
 * Sign in user with google.
 *
 * @param   {Object}  payload
 * @param   {Object}  headers
 * @returns {Promise}
 */

// Verify Google token
async function verifyGoogleToken(idToken) {
  const response = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );
  const payload = response.data;

  // Optional: Validate audience (aud) and expiry (exp)
  if (payload.aud !== CLIENT_ID) {
    throw new Error("Invalid token");
  }

  return {
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
    sub: payload.sub, // Google user ID
  };
}
export const googleSignin = async (payload, res) => {
  try {
    const { id_token } = payload ?? {};
    const googleUser = await verifyGoogleToken(id_token);
    const { email, name, picture, sub } = googleUser;
    if (!email) throw Boom.badRequest("Email is required");

    const userInfo = await knex("userInfo").where({ email });
    if (isEmpty(userInfo)) {
      const newUser = {
        email,
        name,
        google_id: sub,
        create_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      const [insertedUser] = await knex("userInfo").insert(newUser).returning("*");
      insertedUser["jwt_token"] = generateToken({
        id: insertedUser?.id,
        token_key: process.env.JWT_KEY,
        email: insertedUser?.email,
      });
      delete insertedUser.password;
      return {
        status: 200,
        success: true,
        message: "Sign in with google successfull",
        data: [insertedUser],
      };
    }
    // If user already exists, update their Google ID and other info
    const updatedUser = {
      google_id: sub,
      name,
      picture,
      update_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    const [updatedUserInfo] = await knex("userInfo")
      .where({ email })
      .update(updatedUser)
      .returning("*");
    updatedUserInfo["jwt_token"] = generateToken({
      id: updatedUserInfo?.id,
      token_key: process.env.JWT_KEY,
      email: updatedUserInfo?.email,
    });
    delete updatedUserInfo.password;
      return {
        status: 200,
        success: true,
        message: "Sign in with google successfull",
        data: [updatedUserInfo],
      };
  } catch (err) {
    throw err;
  }
};

export const appleSignin = async (payload) => {
  try {
    const { id_token } = payload ?? {};
    if (!id_token) throw Boom.badRequest("Apple ID token is required");
    // Verify Apple ID token
    const appleUser = await axios.post(
      "https://appleid.apple.com/auth/token",
      {
        id_token,
        client_id: process.env.APPLE_CLIENT_ID,
        client_secret: process.env.APPLE_CLIENT_SECRET,
      }
    );
    const { email, name, sub } = appleUser.data;
    if (!email) throw Boom.badRequest("Email is required");
    const userInfo = await knex("userInfo").where({ email });
    if (isEmpty(userInfo)) {
      const newUser = {
        email,
        name,
        apple_id: sub,
        create_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      const [insertedUser] = await knex("userInfo").insert(newUser).returning("*");
      insertedUser["jwt_token"] = generateToken({
        id: insertedUser?.id,
        token_key: process.env.JWT_KEY,
        email: insertedUser?.email,
      });
      delete insertedUser.password;
      return {
        status: 200,
        success: true,
        message: "Apple account signin successfull",
        data: [insertedUser],
      };
    }
    // If user already exists, update their Apple ID and other info
    const updatedUser = {
      apple_id: sub,
      name,
      update_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    const [updatedUserInfo] = await knex("userInfo")
      .where({ email })
      .update(updatedUser)
      .returning("*");
    updatedUserInfo["jwt_token"] = generateToken({
      id: updatedUserInfo?.id,
      token_key: process.env.JWT_KEY,
      email: updatedUserInfo?.email,
    });
    delete updatedUserInfo.password;
    return {
      status: 200,
      success: true,
      message: "Apple account signin successfull",
      data: [updatedUserInfo],
    };
  } catch (err) {
    throw err;
  }
};

export const login = async (payload) => {
  try {
    const { email, password } = payload ?? {};

    const userInfo = await knex("userInfo").where({ email });

    if (isEmpty(userInfo)) throw Boom.notFound("User not found")

    const comparePassword = await bcrypt.compare(
      password,
      userInfo?.[0].password
    );
    if (!comparePassword) throw Boom.forbidden("Invalid password");

    userInfo[0]["jwt_token"] = generateToken({
      id: userInfo?.[0]?.id,
      token_key: process.env.JWT_KEY,
      email: userInfo?.[0]?.email,
      role: userInfo?.[0]?.role,
    });

    delete userInfo[0].password;
    await userModel.query()
        .where({ email })
        .update({
          lastactivityat: new Date().toISOString(),
        });


    return {
      status: 200,
      success: true,
      message: "Login successfull",
      data: userInfo,
    };
  } catch (err) {
    throw err;
  }
};
