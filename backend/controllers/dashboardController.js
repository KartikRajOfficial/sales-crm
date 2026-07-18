const Lead = require("../models/Lead");
const Customer = require("../models/Customer");
const Opportunity = require("../models/Opportunity");

const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalOpportunities = await Opportunity.countDocuments();

    const opportunities = await Opportunity.find();

    const totalPipelineValue = opportunities.reduce(
      (sum, opp) => sum + opp.value,
      0
    );

    res.status(200).json({
      totalLeads,
      totalCustomers,
      totalOpportunities,
      totalPipelineValue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};