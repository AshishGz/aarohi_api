import Joi from 'joi';

export const create = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().allow(''),
    estimated_time: Joi.string().allow(''),
    nepalitile: Joi.string().allow(''),
    nepalidescription: Joi.string().allow(''),
    difficulty: Joi.string().allow(''),
    resources: Joi.array().items(
        Joi.object({
            resource_id: Joi.string().uuid().required(),
            order: Joi.number().integer().optional()
        })
    ).default([])
});

