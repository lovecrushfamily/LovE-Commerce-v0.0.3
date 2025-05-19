import Joi from "joi";

const voucherSchema = {
    create: Joi.object({
        voucher_name: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Voucher name must be a string",
                "string.empty": "Voucher name cannot be empty",
                "string.max": "Voucher name cannot exceed 255 characters",
                "any.required": "Voucher name is required"
            }),

        discount_amount: Joi.number()
            .required()
            .min(0)
            .max(100)
            .messages({
                "number.base": "Discount amount must be a number",
                "number.min": "Discount amount cannot be negative",
                "number.max": "Discount amount cannot exceed 100",
                "any.required": "Discount amount is required"
            }),

        min_amount: Joi.number()
            .required()
            .min(0)
            .messages({
                "number.base": "Minimum amount must be a number",
                "number.min": "Minimum amount cannot be negative",
                "any.required": "Minimum amount is required"
            }),

        limit_: Joi.number()
            .required()
            .min(1)
            .messages({
                "number.base": "Limit must be a number",
                "number.min": "Limit must be at least 1",
                "any.required": "Limit is required"
            }),

        delivery_id: Joi.number()
            .required()
            .messages({
                "number.base": "Delivery ID must be a number",
                "any.required": "Delivery ID is required"
            }),

        start_: Joi.date()
            .required()
            .messages({
                "date.base": "Start date must be a valid date",
                "any.required": "Start date is required"
            }),

        end_: Joi.date()
            .required()
            .min(Joi.ref("start_"))
            .messages({
                "date.base": "End date must be a valid date",
                "date.min": "End date must be after start date",
                "any.required": "End date is required"
            }),

        status_: Joi.boolean()
            .default(true)
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }),

    update: Joi.object({
        voucher_name: Joi.string()
            .max(255)
            .messages({
                "string.base": "Voucher name must be a string",
                "string.max": "Voucher name cannot exceed 255 characters"
            }),

        discount_amount: Joi.number()
            .min(0)
            .max(100)
            .messages({
                "number.base": "Discount amount must be a number",
                "number.min": "Discount amount cannot be negative",
                "number.max": "Discount amount cannot exceed 100"
            }),

        min_amount: Joi.number()
            .min(0)
            .messages({
                "number.base": "Minimum amount must be a number",
                "number.min": "Minimum amount cannot be negative"
            }),

        limit_: Joi.number()
            .min(1)
            .messages({
                "number.base": "Limit must be a number",
                "number.min": "Limit must be at least 1"
            }),

        delivery_id: Joi.number()
            .messages({
                "number.base": "Delivery ID must be a number"
            }),

        start_: Joi.date()
            .messages({
                "date.base": "Start date must be a valid date"
            }),

        end_: Joi.date()
            .min(Joi.ref("start_"))
            .messages({
                "date.base": "End date must be a valid date",
                "date.min": "End date must be after start date"
            }),

        status_: Joi.boolean()
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }).min(1)
};

export default voucherSchema; 