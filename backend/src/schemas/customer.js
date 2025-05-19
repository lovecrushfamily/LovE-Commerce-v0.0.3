import Joi from 'joi';

const customerSchema = {
    create: Joi.object({
        customer_id: Joi.number()
            .required()
            .messages({
                "number.base": "Customer ID must be a number",
                "any.required": "Customer ID is required"
            }),

        customer_name: Joi.string()
            .default('LovE-commerce User')
            .max(255)
            .messages({
                "string.base": "Customer name must be a string",
                "string.max": "Customer name cannot exceed 255 characters"
            }),

        gender: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Gender must be a boolean"
            }),

        phone: Joi.string()
            .pattern(/^[0-9]{10,11}$/)
            .default('0000000000')
            .messages({
                "string.base": "Phone number must be a string",
                "string.pattern.base": "Phone number must be 10-11 digits"
            }),

        avatar: Joi.string()
            .default('/demo_avatar')
            .max(255)
            .messages({
                "string.base": "Avatar must be a string",
                "string.max": "Avatar path cannot exceed 255 characters"
            }),

        date_of_birth: Joi.date()
            .default('2004-10-16')
            .messages({
                "date.base": "Date of birth must be a valid date"
            }),

        nationality: Joi.string()
            .default('Vietnamese')
            .max(255)
            .messages({
                "string.base": "Nationality must be a string",
                "string.max": "Nationality cannot exceed 255 characters"
            }),

        address: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Address must be a string",
                "string.empty": "Address cannot be empty",
                "string.max": "Address cannot exceed 255 characters",
                "any.required": "Address is required"
            })
    }),

    update: Joi.object({
        customer_name: Joi.string()
            .max(255)
            .messages({
                "string.base": "Customer name must be a string",
                "string.max": "Customer name cannot exceed 255 characters"
            }),

        gender: Joi.boolean()
            .messages({
                "boolean.base": "Gender must be a boolean"
            }),

        phone: Joi.string()
            .pattern(/^[0-9]{10,11}$/)
            .messages({
                "string.base": "Phone number must be a string",
                "string.pattern.base": "Phone number must be 10-11 digits"
            }),

        avatar: Joi.string()
            .max(255)
            .messages({
                "string.base": "Avatar must be a string",
                "string.max": "Avatar path cannot exceed 255 characters"
            }),

        date_of_birth: Joi.date()
            .messages({
                "date.base": "Date of birth must be a valid date"
            }),

        nationality: Joi.string()
            .max(255)
            .messages({
                "string.base": "Nationality must be a string",
                "string.max": "Nationality cannot exceed 255 characters"
            }),

        address: Joi.string()
            .max(255)
            .messages({
                "string.base": "Address must be a string",
                "string.max": "Address cannot exceed 255 characters"
            })
    }).min(1)
};

export default customerSchema; 