import Joi from "joi";

export const ReviewSchema = Joi.object({
    product_id: Joi.number()
        .required()
        .messages({
            "number.base": "Product ID must be a number",
            "any.required": "Product ID is required"
        }),

    customer_id: Joi.number()
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

    comment: Joi.string()
        .allow(null, '')
        .max(255)
        .messages({
            "string.base": "Comment must be a string",
            "string.max": "Comment cannot exceed 255 characters"
        }),

    liked: Joi.boolean()
        .default(false)
        .messages({
            "boolean.base": "Liked must be a boolean"
        }),

    images: Joi.string()
        .allow(null, '')
        .max(255)
        .messages({
            "string.base": "Images must be a string",
            "string.max": "Images path cannot exceed 255 characters"
        }),

    shop_reply: Joi.string()
        .allow(null, '')
        .max(255)
        .messages({
            "string.base": "Shop reply must be a string",
            "string.max": "Shop reply cannot exceed 255 characters"
        })
}); 