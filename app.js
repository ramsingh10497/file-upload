const express = require("express");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
