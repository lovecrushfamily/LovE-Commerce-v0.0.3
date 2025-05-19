import Joi from "joi";

const itemSchema = {
    create: Joi.object({
        edition_id: Joi.number()
            .required()
            .messages({
                "number.base": "Edition ID must be a number",
                "any.required": "Edition ID is required"
            }),

        order_id: Joi.number()
            .required()
            .messages({
                "number.base": "Order ID must be a number",
                "any.required": "Order ID is required"
            }),

        voucher_id: Joi.number()
            .allow(null)
            .messages({
                "number.base": "Voucher ID must be a number"
            }),

        delivery_id: Joi.number()
            .allow(null)
            .messages({
                "number.base": "Delivery ID must be a number"
            }),

        promotion_id: Joi.number()
            .allow(null)
            .messages({
                "number.base": "Promotion ID must be a number"
            }),

        quantity: Joi.number()
            .required()
            .min(1)
            .messages({
                "number.base": "Quantity must be a number",
                "number.min": "Quantity must be at least 1",
                "any.required": "Quantity is required"
            }),

        price: Joi.number()
            .required()
            .min(0)
            .messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative",
                "any.required": "Price is required"
            }),

        status_: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Status must be a boolean"
            }),

        discount: Joi.number()
            .min(0)
            .max(100)
            .default(0)
            .messages({
                "number.base": "Discount must be a number",
                "number.min": "Discount cannot be negative",
                "number.max": "Discount cannot exceed 100"
            }),

        note: Joi.string()
            .max(500)
            .allow(null, "")
            .messages({
                "string.base": "Note must be a string",
                "string.max": "Note cannot exceed 500 characters"
            })
    }),

    update: Joi.object({
        quantity: Joi.number()
            .min(1)
            .messages({
                "number.base": "Quantity must be a number",
                "number.min": "Quantity must be at least 1"
            }),

        price: Joi.number()
            .min(0)
            .messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative"
            }),

        status_: Joi.boolean()
            .messages({
                "boolean.base": "Status must be a boolean"
            }),

        discount: Joi.number()
            .min(0)
            .max(100)
            .messages({
                "number.base": "Discount must be a number",
                "number.min": "Discount cannot be negative",
                "number.max": "Discount cannot exceed 100"
            }),

        note: Joi.string()
            .max(500)
            .allow(null, "")
            .messages({
                "string.base": "Note must be a string",
                "string.max": "Note cannot exceed 500 characters"
            })
    }).min(1)
};

export default itemSchema; 