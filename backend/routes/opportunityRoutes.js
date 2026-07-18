const express = require("express");
const router = express.Router();

const {
  createOpportunity,
  getOpportunities,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const validateOpportunity = require("../validators/opportunityValidator");

// Create Opportunity
router.post(
  "/",
  protect,
  validateOpportunity,
  createOpportunity
);

// Get Opportunities
router.get(
  "/",
  protect,
  getOpportunities
);

// Update Opportunity
router.put(
  "/:id",
  protect,
  validateOpportunity,
  updateOpportunity
);

// Delete Opportunity
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteOpportunity
);

module.exports = router;