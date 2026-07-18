const { body, validationResult } = require("express-validator");

const validateLead = [
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

  body("status")
    .optional()
    .isIn([
      "New",
      "Contacted",
      "Qualified",
      "Proposal Sent",
      "Won",
      "Lost",
    ])
    .withMessage("Invalid lead status"),

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

module.exports = validateLead;