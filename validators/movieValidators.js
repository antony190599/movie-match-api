import { param, query } from 'express-validator';

// Validation for movie ID or name parameter
export const validateIdOrName = [
  param('idOrName')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Movie ID or name is required')
    .isLength({ min: 2 })
    .withMessage('Movie ID or name must be at least 2 characters long')
];

// Validation for pagination parameters
export const validatePagination = [
	query('genre')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Genre must be at least 2 characters long'),
  query('name')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  query('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(`Year must be between 1900 and ${new Date().getFullYear()}`),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  query('cursor')
    .optional()
    .isString()
    .withMessage('Cursor must be a string')
];