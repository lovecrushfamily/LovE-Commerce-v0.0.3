import Joi from "joi";

const shopSchema = {
    create: Joi.object({
        shop_name: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Shop name must be a string",
                "string.empty": "Shop name cannot be empty",
                "string.max": "Shop name cannot exceed 255 characters",
                "any.required": "Shop name is required"
            }),

        description_: Joi.string()
            .required()
            .max(1000)
            .messages({
                "string.base": "Description must be a string",
                "string.empty": "Description cannot be empty",
                "string.max": "Description cannot exceed 1000 characters",
                "any.required": "Description is required"
            }),

        owner_id: Joi.number()
            .required()
            .messages({
                "number.base": "Owner ID must be a number",
                "any.required": "Owner ID is required"
            }),

        logo: Joi.string()
            .max(500)
            .allow(null, "")
            .messages({
                "string.base": "Logo must be a string",
                "string.max": "Logo URL cannot exceed 500 characters"
            }),

        banner: Joi.string()
            .max(500)
            .allow(null, "")
            .messages({
                "string.base": "Banner must be a string",
                "string.max": "Banner URL cannot exceed 500 characters"
            }),

        address: Joi.string()
            .required()
            .max(500)
            .messages({
                "string.base": "Address must be a string",
                "string.empty": "Address cannot be empty",
                "string.max": "Address cannot exceed 500 characters",
                "any.required": "Address is required"
            }),

        phone: Joi.string()
            .required()
            .pattern(/^[0-9]{10,15}$/)
            .messages({
                "string.base": "Phone must be a string",
                "string.empty": "Phone cannot be empty",
                "string.pattern.base": "Phone must be a valid phone number (10-15 digits)",
                "any.required": "Phone is required"
            }),

        email: Joi.string()
            .required()
            .email()
            .messages({
                "string.base": "Email must be a string",
                "string.empty": "Email cannot be empty",
                "string.email": "Email must be a valid email address",
                "any.required": "Email is required"
            }),

        status_: Joi.boolean()
            .default(true)
            .messages({
                "boolean.base": "Status must be a boolean"
            }),

        rating: Joi.number()
            .min(0)
            .max(5)
            .default(0)
            .messages({
                "number.base": "Rating must be a number",
                "number.min": "Rating cannot be negative",
                "number.max": "Rating cannot exceed 5"
            })
    }),

    update: Joi.object({
        shop_name: Joi.string()
            .max(255)
            .messages({
                "string.base": "Shop name must be a string",
                "string.max": "Shop name cannot exceed 255 characters"
            }),

        description_: Joi.string()
            .max(1000)
            .messages({
                "string.base": "Description must be a string",
                "string.max": "Description cannot exceed 1000 characters"
            }),

        logo: Joi.string()
            .max(500)
            .allow(null, "")
            .messages({
                "string.base": "Logo must be a string",
                "string.max": "Logo URL cannot exceed 500 characters"
            }),

        banner: Joi.string()
            .max(500)
            .allow(null, "")
            .messages({
                "string.base": "Banner must be a string",
                "string.max": "Banner URL cannot exceed 500 characters"
            }),

        address: Joi.string()
            .max(500)
            .messages({
                "string.base": "Address must be a string",
                "string.max": "Address cannot exceed 500 characters"
            }),

        phone: Joi.string()
            .pattern(/^[0-9]{10,15}$/)
            .messages({
                "string.base": "Phone must be a string",
                "string.pattern.base": "Phone must be a valid phone number (10-15 digits)"
            }),

        email: Joi.string()
            .email()
            .messages({
                "string.base": "Email must be a string",
                "string.email": "Email must be a valid email address"
            }),

        status_: Joi.boolean()
            .messages({
                "boolean.base": "Status must be a boolean"
            }),

        rating: Joi.number()
            .min(0)
            .max(5)
            .messages({
                "number.base": "Rating must be a number",
                "number.min": "Rating cannot be negative",
                "number.max": "Rating cannot exceed 5"
            })
    }).min(1)
};

export default shopSchema; 