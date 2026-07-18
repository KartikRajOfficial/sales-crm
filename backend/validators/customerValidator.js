const { body, validationResult } = require("express-validator");

const validateCustomer = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

  body("contactPerson")
    .trim()
    .notEmpty()
    .withMessage("Contact person is required"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address"),

  body("phone")
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 digits"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateCustomer;