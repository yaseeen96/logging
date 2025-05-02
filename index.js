import express from "express";
import logger from "./logger.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  //   this is a test route add some real world example of a request with logging

  res.send("main server");
});

app.post("/test", (req, res) => {
  //  this post request takes 2 numbers in body and sends a response in output json add logging on every step and also error step as well
  // add error handling
  try {
    const { num1, num2 } = req.body;
    if (!num1 || !num2) {
      logger.error("Missing numbers");
      return res.status(400).json({ error: "Missing numbers" });
    }

    const sum = num1 + num2;
    logger.info(`Sum of ${num1} and ${num2} is ${sum}`);
    res.json({ result: sum });
  } catch (error) {
    logger.error("Error in test route");
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/error", (req, res) => {
  //   try {
  //   winston.ooo();
  // logger.info("Result:)0;
  // res.send("Result: " + result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
