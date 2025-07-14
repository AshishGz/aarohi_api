import Joi from 'joi';

const add = Joi.object({
    id: Joi.string().guid({ version: ['uuidv4'] }).optional(), // UUID, optional if auto-generated
    title: Joi.string().max(255).required(), // Required, max length 255
    title_nepali: Joi.string().max(255).required(), // Optional, max length 255
    duration_weeks: Joi.number().integer().required(), // Optional integer
    category: Joi.string().max(50).required(), // Optional, max length 50
    difficulty: Joi.string().max(50).required(), // Optional, max length 50
    type: Joi.string().max(50).required(), // Optional, max length 50
    description: Joi.string().max(50).required(), // Optional, max length 50
    description_nepali: Joi.string().max(50).required(), // Optional, max length 50
});

const update = Joi.object({
    id: Joi.string().guid({ version: ['uuidv4'] }).optional(), // UUID, optional if auto-generated
    title: Joi.string().max(255).required(), // Required, max length 255
    title_nepali: Joi.string().max(255).required(), // Optional, max length 255
    duration_weeks: Joi.number().integer().required(), // Optional integer
    category: Joi.string().max(50).required(), // Optional, max length 50
    difficulty: Joi.string().max(50).required(), // Optional, max length 50
    type: Joi.string().max(50).required(), // Optional, max length 50
    description: Joi.string().max(50).required(), // Optional, max length 50
    description_nepali: Joi.string().max(50).required(), // Optional, max length 50
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
