import Joi from "joi";

const feedbackSchema = {
    create: Joi.object({
        cutomer_id: Joi.number()
            .required()
            .messages({
                "number.base": "Customer ID must be a number",
                "any.required": "Customer ID is required"
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
            .max(1000)
            .messages({
                "string.base": "Comment must be a string",
                "string.empty": "Comment cannot be empty",
                "string.max": "Comment cannot exceed 1000 characters",
                "any.required": "Comment is required"
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
            .max(1000)
            .messages({
                "string.base": "Comment must be a string",
                "string.max": "Comment cannot exceed 1000 characters"
            })
    }).min(1)
};

export default feedbackSchema; 