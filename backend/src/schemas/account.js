import Joi from 'joi';

const accountSchema = Joi.object({
        user_name: Joi.string()
            .min(4)
            .max(30)
            .required()
            .messages({
                "string.base": "Username must be a string",
                "string.empty": "Username cannot be empty",
                "string.min": "Username must be at least 4 characters",
                "any.required": "Username is required"
            }),
        
        password: Joi.string()
            .min(6)
            .max(100)
            .required()
            .messages({
                "string.min": "Password must be at least 6 characters",
                "any.required": "Password is required"
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Invalid email format",
                "any.required": "Email is required"
            }),

        onl_: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Online status must be a boolean"
            }),

        status_: Joi.boolean()
            .default(false)
            .messages({
                "boolean.base": "Status must be a boolean"
            })
    })

//     update: Joi.object({
//         user_name: Joi.string()
//             .min(4)
//             .max(30)
//             .messages({
//                 "string.base": "Username must be a string",
//                 "string.empty": "Username cannot be empty",
//                 "string.min": "Username must be at least 4 characters"
//             }),
        
//         password_: Joi.string()
//             .min(6)
//             .max(100)
//             .messages({
//                 "string.min": "Password must be at least 6 characters"
//             }),

//         email: Joi.string()
//             .email()
//             .messages({
//                 "string.email": "Invalid email format"
//             }),

//         onl_: Joi.boolean()
//             .messages({
//                 "boolean.base": "Online status must be a boolean"
//             }),

//         status_: Joi.boolean()
//             .messages({
//                 "boolean.base": "Status must be a boolean"
//             })
//     }).min(1)
// };

export default accountSchema; 