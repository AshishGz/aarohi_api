import Joi from 'joi';

const uuid = Joi.string().guid({ version: ['uuidv4'] });

const fileSchema = Joi.object({
    file_url: Joi.string().uri().required(),
    file_name: Joi.string().max(255).required(),
    file_type: Joi.string().valid('pdf', 'docx', 'video', 'image', 'xlsx', 'txt').required()
});

export const resourceSchema = Joi.object({
    title: Joi.string().required(),
    title_nepali: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    description_nepali: Joi.string().allow('').optional(),
    language: Joi.string().max(50).required(),

    category_id: uuid.required(),
    format_id: uuid.required(),
    difficulty_id: uuid.required(),

    is_public: Joi.boolean().optional(),

    tags: Joi.string().optional(), // array of UUIDs

    files: Joi.array().items(fileSchema).optional() // array of file objects
});
export const getAllScheme = Joi.object({
    pageNumber: Joi.number().integer().min(1).optional(),
    pageSize: Joi.number().integer().min(1).optional(),
});