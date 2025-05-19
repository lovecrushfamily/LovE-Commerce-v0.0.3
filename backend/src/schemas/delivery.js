import Joi from "joi";

const deliverySchema = {
    create: Joi.object({
        delivery_name: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Delivery name must be a string",
                "string.empty": "Delivery name cannot be empty",
                "string.max": "Delivery name cannot exceed 255 characters",
                "any.required": "Delivery name is required"
            }),

        price: Joi.number()
            .required()
            .min(0)
            .messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative",
                "any.required": "Price is required"
            }),

        description_: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Description must be a string",
                "string.empty": "Description cannot be empty",
                "string.max": "Description cannot exceed 255 characters",
                "any.required": "Description is required"
            }),

        status_: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }),

    update: Joi.object({
        delivery_name: Joi.string()
            .max(255)
            .messages({
                "string.base": "Delivery name must be a string",
                "string.max": "Delivery name cannot exceed 255 characters"
            }),

        price: Joi.number()
            .min(0)
            .messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative"
            }),

        description_: Joi.string()
            .max(255)
            .messages({
                "string.base": "Description must be a string",
                "string.max": "Description cannot exceed 255 characters"
            }),

        status_: Joi.boolean()
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }).min(1)
};

export default deliverySchema; 