import bcrypt from "bcrypt";

import { isEmpty, uuid } from "../../platforms/utils/common.js";
import knex from "../../platforms/utils/knex.js";
import Boom from "@hapi/boom";
import authModel from "../auth.model.js";

export const signUp = async (payload) => {
  try {
    const { email, password } = payload ?? {};
    // const isDuplicate = await knex.raw('Select * from userInfo where email = ?', [email]);
    const isDuplicate = await authModel.query().select('*').where('email', email);


    if (!isEmpty(isDuplicate)) {
      throw Boom.notFound(
        "Email already exists. Please try with another email."
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await authModel.query().insert({
      id: uuid(),
      email,
      password: hashedPassword,
      create_date: new Date().toISOString(),
      update_date: new Date().toISOString(),
      role:'PUBLIC'
    });


    return {
      status: 200,
      success: true,
      message: "Sign Up user successfull! Please login to continue.",
    };
  } catch (err) {
    throw err;
  }
};
