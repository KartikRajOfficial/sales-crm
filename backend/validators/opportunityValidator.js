const { body, validationResult } = require("express-validator");

const validateOpportunity = [
  body("dealName")
    .trim()
    .notEmpty()
    .withMessage("Deal name is required"),

  body("customer")
    .notEmpty()
    .withMessage("Customer ID is required")
    .isMongoId()
    .withMessage("Invalid Customer ID"),

  body("value")
    .notEmpty()
    .withMessage("Deal value is required")
    .isNumeric()
    .withMessage("Deal value must be a number"),

  body("stage")
    .optional()
    .isIn([
      "Prospecting",
      "Qualification",
      "Proposal",
      "Negotiation",
      "Won",
      "Lost",
    ])
    .withMessage("Invalid opportunity stage"),

  body("expectedCloseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),

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

module.exports = validateOpportunity;