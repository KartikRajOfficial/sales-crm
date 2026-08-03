const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const customerRoutes = require("./routes/customerRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Sales CRM Backend Running");
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});