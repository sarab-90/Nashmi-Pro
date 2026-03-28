export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { 
            abortEarly: false 
        });
        if (error) {
            const errorDetails = error.details.map(detail => detail.message);
            return res.status(400).json({success: false,  errors: errorDetails });
        }
        req.validateData = value;
        next();
    }
}