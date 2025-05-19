import Joi from 'joi';

const categorySchema = {
    create: Joi.object({
        category_name: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Category name must be a string",
                "string.empty": "Category name cannot be empty",
                "string.max": "Category name cannot exceed 255 characters",
                "any.required": "Category name is required"
            }),

        parent_id: Joi.number()
            .allow(null)
            .messages({
                "number.base": "Parent ID must be a number"
            }),

        traits: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Traits must be a string",
                "string.empty": "Traits cannot be empty",
                "string.max": "Traits cannot exceed 255 characters",
                "any.required": "Traits are required"
            }),

        description_: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Description must be a string",
                "string.empty": "Description cannot be empty",
                "string.max": "Description cannot exceed 255 characters",
                "any.required": "Description is required"
            })
    }),

    update: Joi.object({
        category_name: Joi.string()
            .max(255)
            .messages({
                "string.base": "Category name must be a string",
                "string.max": "Category name cannot exceed 255 characters"
            }),

        parent_id: Joi.number()
            .allow(null)
            .messages({
                "number.base": "Parent ID must be a number"
            }),

        traits: Joi.string()
            .max(255)
            .messages({
                "string.base": "Traits must be a string",
                "string.max": "Traits cannot exceed 255 characters"
            }),

        description_: Joi.string()
            .max(255)
            .messages({
                "string.base": "Description must be a string",
                "string.max": "Description cannot exceed 255 characters"
            })
    }).min(1)
};

export default categorySchema; 