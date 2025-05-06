import Joi from "joi";

// ✅ Schema for creating a new account
export const AccountSchema = Joi.object({
	account_id: Joi.number(),
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
	
	password_: Joi.string()
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
});

