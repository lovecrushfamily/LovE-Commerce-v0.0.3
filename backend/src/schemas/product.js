import Joi from "joi";

const productSchema = {
    create: Joi.object({
        product_name: Joi.string()
            .required()
            .max(255)
            .messages({
                "string.base": "Product name must be a string",
                "string.empty": "Product name cannot be empty",
                "string.max": "Product name cannot exceed 255 characters",
                "any.required": "Product name is required"
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

        category_id: Joi.number()
            .required()
            .messages({
                "number.base": "Category ID must be a number",
                "any.required": "Category ID is required"
            }),

        shop_id: Joi.number()
            .required()
            .messages({
                "number.base": "Shop ID must be a number",
                "any.required": "Shop ID is required"
            }),

        price: Joi.number()
            .required()
            .min(0)
            .messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative",
                "any.required": "Price is required"
            }),

        stock: Joi.number()
            .required()
            .min(0)
            .messages({
                "number.base": "Stock must be a number",
                "number.min": "Stock cannot be negative",
                "any.required": "Stock is required"
            }),

        images: Joi.array()
            .items(Joi.string().max(500))
            .max(10)
            .messages({
                "array.base": "Images must be an array",
                "array.max": "Cannot have more than 10 images",
                "string.max": "Image URL cannot exceed 500 characters"
            }),

        status_: Joi.boolean()
            .default(true)
            .messages({
                "boolean.base": "Status must be a boolean"
            }),

        tags: Joi.array()
            .items(Joi.string().max(50))
            .max(20)
            .messages({
                "array.base": "Tags must be an array",
                "array.max": "Cannot have more than 20 tags",
                "string.max": "Tag cannot exceed 50 characters"
            })
    }),

    update: Joi.object({
        product_name: Joi.string()
            .max(255)
            .messages({
                "string.base": "Product name must be a string",
                "string.max": "Product name cannot exceed 255 characters"
            }),

        description_: Joi.string()
            .max(1000)
            .messages({
                "string.base": "Description must be a string",
                "string.max": "Description cannot exceed 1000 characters"
            }),

        category_id: Joi.number()
            .messages({
                "number.base": "Category ID must be a number"
            }),

        shop_id: Joi.number()
            .messages({
                "number.base": "Shop ID must be a number"
            }),

        price: Joi.number()
            .min(0)
            .messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative"
            }),

        stock: Joi.number()
            .min(0)
            .messages({
                "number.base": "Stock must be a number",
                "number.min": "Stock cannot be negative"
            }),

        images: Joi.array()
            .items(Joi.string().max(500))
            .max(10)
            .messages({
                "array.base": "Images must be an array",
                "array.max": "Cannot have more than 10 images",
                "string.max": "Image URL cannot exceed 500 characters"
            }),

        status_: Joi.boolean()
            .messages({
                "boolean.base": "Status must be a boolean"
            }),

        tags: Joi.array()
            .items(Joi.string().max(50))
            .max(20)
            .messages({
                "array.base": "Tags must be an array",
                "array.max": "Cannot have more than 20 tags",
                "string.max": "Tag cannot exceed 50 characters"
            })
    }).min(1)
};

export default productSchema; 