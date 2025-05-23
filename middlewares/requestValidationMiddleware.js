import { validationResult } from 'express-validator';


export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));
    
    // Check if there are validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    // Return validation errors
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array()
    });
  };
};
