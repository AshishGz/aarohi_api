/**
 * Utility helper for Joi validation.
 *
 * @param  {Object}  schema
 *  @param {String}  property [body, query, params]
 * @return {null|Object}
 */
const validate = (schema, property) => {
  return function(req, res, next) {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      return next(error);
    }
    return next();
  };
};

export default validate;
