import Joi from "joi";

const orderSchema = {
    create: Joi.object({
        customer_id: Joi.number()
            .required()
            .messages({
                "number.base": "Customer ID must be a number",
                "any.required": "Customer ID is required"
            }),

        total_amount: Joi.number()
            .required()
            .min(0)
            .messages({
                "number.base": "Total amount must be a number",
                "number.min": "Total amount cannot be negative",
                "any.required": "Total amount is required"
            }),

        status_: Joi.string()
            .required()
            .valid("pending", "processing", "shipped", "delivered", "cancelled")
            .messages({
                "string.base": "Status must be a string",
                "string.empty": "Status cannot be empty",
                "any.only": "Status must be one of: pending, processing, shipped, delivered, cancelled",
                "any.required": "Status is required"
            }),

        payment_status: Joi.string()
            .required()
            .valid("pending", "paid", "failed", "refunded")
            .messages({
                "string.base": "Payment status must be a string",
                "string.empty": "Payment status cannot be empty",
                "any.only": "Payment status must be one of: pending, paid, failed, refunded",
                "any.required": "Payment status is required"
            }),

        shipping_address: Joi.string()
            .required()
            .max(500)
            .messages({
                "string.base": "Shipping address must be a string",
                "string.empty": "Shipping address cannot be empty",
                "string.max": "Shipping address cannot exceed 500 characters",
                "any.required": "Shipping address is required"
            }),

        tracking_number: Joi.string()
            .max(100)
            .allow(null, "")
            .messages({
                "string.base": "Tracking number must be a string",
                "string.max": "Tracking number cannot exceed 100 characters"
            }),

        notes: Joi.string()
            .max(1000)
            .allow(null, "")
            .messages({
                "string.base": "Notes must be a string",
                "string.max": "Notes cannot exceed 1000 characters"
            })
    }),

    update: Joi.object({
        total_amount: Joi.number()
            .min(0)
            .messages({
                "number.base": "Total amount must be a number",
                "number.min": "Total amount cannot be negative"
            }),

        status_: Joi.string()
            .valid("pending", "processing", "shipped", "delivered", "cancelled")
            .messages({
                "string.base": "Status must be a string",
                "any.only": "Status must be one of: pending, processing, shipped, delivered, cancelled"
            }),

        payment_status: Joi.string()
            .valid("pending", "paid", "failed", "refunded")
            .messages({
                "string.base": "Payment status must be a string",
                "any.only": "Payment status must be one of: pending, paid, failed, refunded"
            }),

        shipping_address: Joi.string()
            .max(500)
            .messages({
                "string.base": "Shipping address must be a string",
                "string.max": "Shipping address cannot exceed 500 characters"
            }),

        tracking_number: Joi.string()
            .max(100)
            .allow(null, "")
            .messages({
                "string.base": "Tracking number must be a string",
                "string.max": "Tracking number cannot exceed 100 characters"
            }),

        notes: Joi.string()
            .max(1000)
            .allow(null, "")
            .messages({
                "string.base": "Notes must be a string",
                "string.max": "Notes cannot exceed 1000 characters"
            })
    }).min(1)
};

export default orderSchema; 