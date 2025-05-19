import Joi from "joi";

const reviewSchema = {
    create: Joi.object({
        customer_id: Joi.number()
            .required()
            .messages({
                "number.base": "Customer ID must be a number",
                "any.required": "Customer ID is required"
            }),

        edition_id: Joi.number()
            .required()
            .messages({
                "number.base": "Edition ID must be a number",
                "any.required": "Edition ID is required"
            }),

        rating: Joi.number()
            .required()
            .min(1)
            .max(5)
            .messages({
                "number.base": "Rating must be a number",
                "number.min": "Rating must be at least 1",
                "number.max": "Rating cannot exceed 5",
                "any.required": "Rating is required"
            }),

        comment_: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Comment must be a string",
                "string.empty": "Comment cannot be empty",
                "string.max": "Comment cannot exceed 255 characters",
                "any.required": "Comment is required"
            }),

        images: Joi.string()
            .max(255)
            .messages({
                "string.base": "Images must be a string",
                "string.max": "Images path cannot exceed 255 characters"
            }),

        status_: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }),

    update: Joi.object({
        rating: Joi.number()
            .min(1)
            .max(5)
            .messages({
                "number.base": "Rating must be a number",
                "number.min": "Rating must be at least 1",
                "number.max": "Rating cannot exceed 5"
            }),

        comment_: Joi.string()
            .max(255)
            .messages({
                "string.base": "Comment must be a string",
                "string.max": "Comment cannot exceed 255 characters"
            }),

        images: Joi.string()
            .max(255)
            .messages({
                "string.base": "Images must be a string",
                "string.max": "Images path cannot exceed 255 characters"
            }),

        status_: Joi.boolean()
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }).min(1)
};

export default reviewSchema; 