const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json())
const userRoute = require("./routes/userRoutes");

app.use("/users", userRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
