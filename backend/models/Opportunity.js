const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    dealName: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    stage: {
      type: String,
      enum: [
        "Prospecting",
        "Qualification",
        "Proposal",
        "Negotiation",
        "Won",
        "Lost",
      ],
      default: "Prospecting",
    },
    expectedCloseDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Opportunity",
  opportunitySchema
);