const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

// Middleware function to validate the input fields
exports.createValidatorr = [
  // Validate 'name' field
  body('name').trim().isLength({ min: 5, max: 255 }).withMessage('Name is required and must be less than 255 characters'),

  // Validate 'description' field
  body('description').trim().isLength({ min: 5, max: 255 }).withMessage('Description is required'),

  // Validate 'price' field
  body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

  // Validate 'stock' field
  body('stock').optional().isInt({ gt: -1 }).withMessage('Stock must be a non-negative integer'),

  // Validate 'category' field
  body('category').optional().trim().isLength({ min: 1 }).withMessage('Category is required'),

  // Validate 'file' (image) field (assuming it's a file upload, you need additional middleware like multer for file validation)
  // Example validation for file size and type
  // Multer middleware should be used here for file validation, this is just a placeholder
  // body('file').custom((value, { req }) => {
  //   if (!req.file) {
  //     throw new Error('Image file is required');
  //   }
  //   return true;
  // }),

  // Sanitize all fields to prevent XSS attacks
  body('*').escape(),

];

exports.createValidator = [

  // PROCESS REQUEST AFTER VALIDATION & SANITIZATION
  asyncHandler(async (req, res, next) => {
    // EXTRACT VALIDATION ERRORS FROM REQUEST
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // ERROR! RENDER FORM AGAIN WITH SANITIZED VALUES & ERROR MESSAGES
      console.log('there are errors in the form: ', errors);
    }
    else {
      next();
    }
  }),
];
