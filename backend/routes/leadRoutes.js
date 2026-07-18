const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const validateLead = require("../validators/leadValidator");

// Create Lead (Logged-in users)
router.post(
  "/",
  protect,
  validateLead,
  createLead
);

// Get All Leads (Logged-in users)
router.get(
  "/",
  protect,
  getLeads
);

// Update Lead (Logged-in users)
router.put(
  "/:id",
  protect,
  validateLead,
  updateLead
);

// Delete Lead (Admin only)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteLead
);

module.exports = router;