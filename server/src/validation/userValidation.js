import joi from 'joi';
// Validation schema for user registration
export const registerSchema = joi.object({
    name: joi.string().min(3).max(255).required().trim().messages({
        'string.min': 'Name must be at least 3 characters ',
        'string.max': 'Name must be less than 255 characters',
        'string.required': 'Name is required',
        'string.empty': 'Name is required',
    }),
    email: joi.string().email().min(6).max(255).required().trim().messages({
        'string.email': 'Please provide a valid email',
        'string.min': 'Email must be at least 6 characters',
        'string.max': 'Email must be less than 255 characters',
        'string.required': 'Email is required',
        'string.empty': 'Email is required',
    }),
    password: joi.string().min(8).max(255).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must be less than 255 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'string.required': 'Password is required',
        'string.empty': 'Password is required',
    }),
    role: joi.string().valid('user', 'admin').default('user').required().messages({
        'string.valid': 'Role must be either user or admin',
        'string.required': 'Role is required',
        'string.empty': 'Role is required',
    }),
});
// Validation schema for user login
export const loginSchema = joi.object({
    email: joi.string().email().min(6).max(255).required().trim().messages({
        'string.email': 'Please provide a valid email',
        'string.min': 'Email must be at least 6 characters',
        'string.max': 'Email must be less than 255 characters',
        'string.required': 'Email is required',
        'string.empty': 'Email is required',
    }),
    password: joi.string().min(8).max(1024).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must be less than 1024 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'string.required': 'Password is required',
        'string.empty': 'Password is required',
    })
});
