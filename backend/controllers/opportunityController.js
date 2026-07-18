const Opportunity = require("../models/Opportunity");

// Create Opportunity
const createOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.create(req.body);
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Opportunities
// Get All Opportunities
const getOpportunities = async (req, res) => {
  try {
    const {
      stage,
      minValue,
      maxValue,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    let filter = {};

    if (stage) {
      filter.stage = stage;
    }

    if (minValue || maxValue) {
      filter.value = {};

      if (minValue) {
        filter.value.$gte = Number(minValue);
      }

      if (maxValue) {
        filter.value.$lte = Number(maxValue);
      }
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const total = await Opportunity.countDocuments(filter);

    const opportunities = await Opportunity.find(filter)
      .populate("customer")
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      opportunities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Opportunity
const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Opportunity
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(
      req.params.id
    );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    res.status(200).json({
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOpportunity,
  getOpportunities,
  updateOpportunity,
  deleteOpportunity,
};