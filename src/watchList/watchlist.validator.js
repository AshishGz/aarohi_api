import Joi from "joi";

export default {
  watchlist: Joi.object({
    script: Joi.string().required(),
    user_id: Joi.string().required(),
  }).required(),

  userId: Joi.string().required(),
};
