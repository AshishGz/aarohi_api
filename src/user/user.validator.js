import Joi from "joi";

export default {
  add: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string().required(),
    profile_picture: Joi.string().optional(),
    cohort_id: Joi.string().required(),
    phone_number: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    name_nepali: Joi.string().optional(),
    business_state: Joi.string().optional(),

  }).required(),

  update: Joi.object({

    name: Joi.string().required(),
    profile_picture: Joi.string().optional(),
    cohort_id: Joi.string().required(),
    phone_number: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    name_nepali: Joi.string().optional(),
    business_state: Joi.string().optional(),

  }).required(),

  changeRole: Joi.object({
    role: Joi.string().required(),

  }).required(),

  updatePassword:Joi.object({
    email: Joi.string().email().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  }),

  list:Joi.object({
    pageNumber: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    role: Joi.string().optional(),
  })


};
