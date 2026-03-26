require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// import routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

// use routes
app.use("/", taskRoutes);
app.use("/users", userRoutes);


// connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection failed", err));

// start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});