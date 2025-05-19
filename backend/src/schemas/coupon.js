import Joi from "joi";

const couponSchema = {
    create: Joi.object({
        coupon_code: Joi.string()
            .required()
            .max(50)
            .messages({
                "string.base": "Coupon code must be a string",
                "string.empty": "Coupon code cannot be empty",
                "string.max": "Coupon code cannot exceed 50 characters",
                "any.required": "Coupon code is required"
            }),

        discount_amount: Joi.number()
            .required()
            .min(0)
            .messages({
                "number.base": "Discount amount must be a number",
                "number.min": "Discount amount cannot be negative",
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

        start_date: Joi.date()
            .required()
            .messages({
                "date.base": "Start date must be a valid date",
                "any.required": "Start date is required"
            }),

        end_date: Joi.date()
            .required()
            .min(Joi.ref('start_date'))
            .messages({
                "date.base": "End date must be a valid date",
                "date.min": "End date must be after start date",
                "any.required": "End date is required"
            }),

        status_: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    }),

    update: Joi.object({
        coupon_code: Joi.string()
            .max(50)
            .messages({
                "string.base": "Coupon code must be a string",
                "string.max": "Coupon code cannot exceed 50 characters"
            }),

        discount_amount: Joi.number()
            .min(0)
            .messages({
                "number.base": "Discount amount must be a number",
                "number.min": "Discount amount cannot be negative"
            }),

        min_amount: Joi.number()
            .min(0)
            .messages({
                "number.base": "Minimum amount must be a number",
                "number.min": "Minimum amount cannot be negative"
            }),

        start_date: Joi.date()
            .messages({
                "date.base": "Start date must be a valid date"
            }),

        end_date: Joi.date()
            .min(Joi.ref('start_date'))
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

export default couponSchema; 