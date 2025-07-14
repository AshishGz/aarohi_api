import Joi from 'joi';

const add = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().allow('').optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    max_mentees: Joi.number().integer().min(1).optional(),
    status: Joi.string().valid('Planning' , 'Active' ,'Completing' , 'Completed').optional()
});

const update = Joi.object({
    name: Joi.string().max(255).optional(),
    description: Joi.string().allow('').optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    max_mentees: Joi.number().integer().min(1).optional(),
    status: Joi.string().valid('Planning' , 'Active' ,'Completing' , 'Completed').optional()
});

const getById = Joi.object({
    id: Joi.string().required()
});
const getAll = Joi.object({
    pageNumber: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    status: Joi.string().valid('Planning' , 'Active' ,'Completing' , 'Completed').optional()
});


export default {
    add,
    update,
    getById,
    getAll
};
