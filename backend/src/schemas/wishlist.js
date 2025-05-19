import Joi from "joi";

const wishlistSchema = {
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

        status_: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }),

    update: Joi.object({
        status_: Joi.boolean()
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }).min(1)
};

export default wishlistSchema; 