const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const validateCustomer = require("../validators/customerValidator");

// Create Customer (Logged-in users)
router.post(
  "/",
  protect,
  validateCustomer,
  createCustomer
);

// Get All Customers (Logged-in users)
router.get(
  "/",
  protect,
  getCustomers
);

// Update Customer (Logged-in users)
router.put(
  "/:id",
  protect,
  validateCustomer,
  updateCustomer
);

// Delete Customer (Admin only)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCustomer
);

module.exports = router;